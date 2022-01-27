import React, { useState } from "react";
import { View, Text } from "react-native";
import { Appbar, Modal, Portal, Button } from "react-native-paper";

export default function Header({ navigation }) {

    const [exibirModal, setExibirModal] = useState(false);

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
                <Appbar.Action
                    icon="home-outline"
                    onPress={
                        () => navigation.navigate('login')
                    }
                />
                <Appbar.Action
                    icon="chart-pie"
                    onPress={
                        () => navigation.navigate('dashboard')
                    }
                />
                <Appbar.Action
                    icon="office-building"
                    onPress={
                        () => navigation.navigate('empresas-consulta')
                    }
                />
                <Appbar.Action
                    icon="account-circle-outline"
                    onPress={
                        () => setExibirModal(true)
                    }
                />
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
                        <Button mode="outlined" onPress={() => setExibirModal(false)}>
                            Fechar
                        </Button>
                    </View>

                </Modal>
            </Portal>

        </View>
    )

}
