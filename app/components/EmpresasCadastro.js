import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Header from "./Header";

export default function EmpresasCadastro({ navigation }) {

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
                    title="Cadastro de Empresas"
                    subtitle="Preencha os campos para incluir uma empresa"
                />
                <Card.Content>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='nomeFantasia'
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Nome Fantasia"
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

                        <Controller
                            control={control}
                            name='razaoSocial'
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Razão Social"
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

                        <Controller
                            control={control}
                            name='cnpj'
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="CNPJ"
                                        keyboardType="number-pad"
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

                        <Controller
                            control={control}
                            name='telefone'
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Telefone"
                                        keyboardType="phone-pad"
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
                            Realizar Cadastro
                        </Button>

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Button mode="outlined" onPress={
                            () => navigation.navigate('empresas-consulta')
                        }>
                            Consultar Empresas
                        </Button>

                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}