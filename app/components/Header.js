import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Appbar, Modal, Portal, Button } from "react-native-paper";
import * as helpers from '../helpers/auth-helpers';

export default function Header({ navigation }) {

    const [exibirModal, setExibirModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //função para verificar se o usuário está autenticado
    const verificarAutenticacao = () => {
        helpers.getAccessToken()
            .then(
                token => {
                    setIsLoggedIn(token != null && token != '');
                }
            )
    }

    //função para realizar o logout
    const logout = () => {
        helpers.signOut();
        navigation.navigate('login')
    }

    //funçao do REACT HOOKS executada
    //sempre que o componente é carregado
    useEffect(
        () => {
            verificarAutenticacao();
            const unsubscrible = navigation.addListener('focus', () => {
                verificarAutenticacao();
            });
            return unsubscrible;
        }, [navigation]
    )

    return (
        <View>

            {/* barra de topo do aplicativo */}
            <Appbar.Header>
                <Appbar.Content
                    title="Controle de Empresas"
                    subtitle="COTI Informática"
                    titleStyle={{
                        fontSize: 15
                    }}
                    subtitleStyle={{
                        fontSize: 14
                    }}
                />

                {
                    !isLoggedIn && <Appbar.Action
                        icon="home-outline"
                        onPress={
                            () => navigation.navigate('login')
                        }
                    />
                }

                {
                    isLoggedIn && <Appbar.Action
                        icon="chart-pie"
                        onPress={
                            () => navigation.navigate('dashboard')
                        }
                    />
                }

                {
                    isLoggedIn && <Appbar.Action
                        icon="office-building"
                        onPress={
                            () => navigation.navigate('empresas-consulta')
                        }
                    />
                }

                {
                    isLoggedIn && <Appbar.Action
                        icon="account-circle-outline"
                        onPress={
                            () => setExibirModal(true)
                        }
                    />

                }

            </Appbar.Header>

            {/* janela modal */}
            <Portal>
                <Modal
                    visible={exibirModal}
                    onDismiss={
                        () => setExibirModal(false)
                    }
                    style={{
                        backgroundColor: 'white',
                        padding: 20,
                        height: 260,
                        margin: 40
                    }}
                >

                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>
                            Usuário Administrador
                        </Text>
                        <Text style={{ fontSize: 18, marginBottom: 20 }}>
                            administrador@gmail.com
                        </Text>
                        <Button mode="outlined"
                            style={{ marginBottom: 20 }}
                            onPress={() => logout()}>
                            Encerrar Sessão
                        </Button>
                        <Button mode="outlined"
                            style={{ marginBottom: 20 }}
                            onPress={() => setExibirModal(false)}>
                            Fechar
                        </Button>
                    </View>

                </Modal>
            </Portal>

        </View>
    )

}
