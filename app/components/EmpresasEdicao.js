import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, Text, Alert } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Header from "./Header";
import textValidation from "../validations/text-validation";
import * as services from '../services/empresas-services';

export default function EmpresasEdicao({ route, navigation }) {

    //capturando o id da empresa enviado pela tela consulta
    const { idEmpresa } = route.params;

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        services.putEmpresa(data)
            .then(
                result => {
                    Alert.alert('Operação realizada com sucesso', result.message);
                }
            )
            .catch(
                e => {
                    Alert.alert('Erro', 'Operação não pôde ser realizada.');
                }
            )
    }

    const obterEmpresa = (idEmpresa) => {
        services.getEmpresaById(idEmpresa)
            .then(
                result => {
                    //preenchendo o formulário com os dados da empresa
                    reset({
                        idEmpresa: result.idEmpresa,
                        nomeFantasia: result.nomeFantasia,
                        razaoSocial: result.razaoSocial,
                        cnpj: result.cnpj,
                        telefone: result.telefone
                    })
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            )
    }

    //Função executada quando o componente é carregado
    useEffect(
        () => {
            obterEmpresa(idEmpresa);
        }, []
    );

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Title
                    title="Edição de Empresas"
                    subtitle="Utiliza os campos para alterar os dados da empresa"
                />
                <Card.Content>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='nomeFantasia'
                            rules={{
                                validate: textValidation
                            }}
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

                        {/* mensagem de erro de validação */}
                        {
                            errors.nomeFantasia && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.nomeFantasia.message}
                            </Text>
                        }

                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='razaoSocial'
                            rules={{
                                validate: textValidation
                            }}
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

                        {/* mensagem de erro de validação */}
                        {
                            errors.razaoSocial && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.razaoSocial.message}
                            </Text>
                        }


                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='cnpj'
                            rules={{
                                validate: textValidation
                            }}
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

                        {/* mensagem de erro de validação */}
                        {
                            errors.cnpj && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.cnpj.message}
                            </Text>
                        }


                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='telefone'
                            rules={{
                                validate: textValidation
                            }}
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

                        {/* mensagem de erro de validação */}
                        {
                            errors.telefone && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.telefone.message}
                            </Text>
                        }


                    </View>

                    <View style={{ marginBottom: 20 }}>

                        <Button mode="contained" onPress={
                            handleSubmit(onSubmit)
                        }>
                            Salvar Alterações
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