import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, ScrollView, Text, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Header from "./Header";
import textValidation from "../validations/text-validation";
import * as services from '../services/empresas-services';

export default function EmpresasConsulta({ navigation }) {

    const [mensagem, setMensagem] = useState('');
    const [empresas, setEmpresas] = useState([]);

    const {
        control,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm();

    const onSubmit = (data) => {

        services.getEmpresaByNomeFantasia(data.pesquisa)
            .then(
                result => {
                    //armazenando os dados das empresas obtidas
                    setEmpresas(result);

                    if (result.length == 0) {
                        setMensagem('Nenhuma empresa foi encontrada para o filtro especificado.');
                    }
                    else {
                        setMensagem('Foram encontrados ' + result.length + ' empresas para o filtro especificado.');
                    }
                }
            )
            .catch(
                e => {
                    console.log(e.response);
                    Alert.alert('Erro!', 'Operação não pôde ser realizada.');
                }
            )
    }

    //função para realizar a exclusão da empresa
    const excluir = (idEmpresa) => {
        Alert.alert(
            'Exclusão de Empresa',
            'Deseja realmente excluir a empresa selecionada?',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        services.deleteEmpresa(idEmpresa)
                            .then(
                                result => {
                                    Alert.alert('Operação realizada com sucesso!', result.message);
                                    setEmpresas([]);
                                    setMensagem('');
                                    reset({ pesquisa: '' });
                                }
                            )
                            .catch(
                                e => {
                                    Alert.alert('Erro!', 'Operação não pôde ser realizada.');
                                }
                            )
                    }
                },
                {
                    text: 'Cancelar'
                }
            ]
        )
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
                            rules={{
                                validate: textValidation
                            }}
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

                        {/* mensagem de erro de validação */}
                        {
                            errors.pesquisa && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.pesquisa.message}
                            </Text>
                        }

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
                        {
                            mensagem.length > 0 && <Text style={{
                                fontWeight: 'bold',
                                fontSize: 15
                            }}>
                                {mensagem}
                            </Text>
                        }
                    </View>

                    <View style={{ marginBottom: 20 }}>

                        {
                            empresas.map(
                                function (empresa, i) {
                                    return (
                                        <Card key={i}>
                                            <Card.Content>
                                                <View>
                                                    <Text style={{
                                                        fontWeight: 'bold', fontSize: 16
                                                    }}>
                                                        {empresa.nomeFantasia}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text>
                                                        Razão Social: {empresa.razaoSocial}
                                                    </Text>
                                                    <Text>
                                                        CNPJ: {empresa.cnpj}
                                                    </Text>
                                                    <Text>
                                                        Telefone: {empresa.telefone}
                                                    </Text>
                                                </View>
                                            </Card.Content>
                                            <Card.Actions>
                                                <Button icon="pencil-outline" mode="text"
                                                    onPress={
                                                        () => navigation.navigate('empresas-edicao',
                                                            {
                                                                idEmpresa: empresa.idEmpresa
                                                            })
                                                    }>
                                                    Editar
                                                </Button>
                                                <Button icon="delete-outline" mode="text"
                                                    onPress={
                                                        () => excluir(empresa.idEmpresa)
                                                    }>
                                                    Excluir
                                                </Button>
                                            </Card.Actions>
                                        </Card>
                                    )
                                }
                            )
                        }

                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}