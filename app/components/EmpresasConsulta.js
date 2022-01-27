import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Header from "./Header";

export default function EmpresasConsulta({ navigation }) {

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Title
                    title="Consulta de Empresas"
                    subtitle="Listagem de empresas cadastradas"
                />
                <Card.Content>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='pesquisa'
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Nome Fantasia ou Razão Social"
                                        keyboardType="default"
                                        mode="flat"
                                        placeholder="Digite aqui"
                                        onBlur={onBlur}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )
                            }
                        />

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Button mode="contained" onPress={
                            handleSubmit(onSubmit)
                        }>
                            Pesquisar Empresas
                        </Button>

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Button mode="outlined" onPress={
                            () => navigation.navigate('empresas-cadastro')
                        }>
                            Cadastrar nova Empresa
                        </Button>

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Card>
                            <Card.Content>
                                <View>
                                    <Text style={{
                                        fontWeight: 'bold', fontSize: 16
                                    }}>
                                        Empresa Modelo LTDA
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        Razão Social: Empresa Modelo LTDA RJ
                                    </Text>
                                    <Text>
                                        CNPJ: 28.364.665/0001-01
                                    </Text>
                                    <Text>
                                        Telefone: (21) 99999-9999
                                    </Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                                <Button icon="pencil-outline" mode="text"
                                    onPress={
                                        () => navigation.navigate('empresas-edicao')
                                    }>
                                    Editar
                                </Button>
                                <Button icon="delete-outline" mode="text">
                                    Excluir
                                </Button>
                            </Card.Actions>
                        </Card>

                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}