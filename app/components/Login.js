import React from "react";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, View, Text, Alert } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import Header from "./Header";
import textValidation from "../validations/text-validation";
import * as services from '../services/login-services';
import * as helpers from '../helpers/auth-helpers';

export default function Login({ navigation }) {

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

        services.postLogin(data)
            .then(
                result => {

                    //limpar os campos
                    reset({ login: '', senha : '' });

                    //exibindo mensagem
                    Alert.alert('Seja bem vindo!', result.mensagem);

                    //salvando o token na AsyncStorage
                    helpers.signIn(result.accessToken);

                    //redirecionando
                    navigation.navigate('dashboard');
                }
            )
            .catch(
                e => {
                    Alert.alert('Não autorizado', 'Acesso negado, por favor verifique seu login e senha.');
                    console.log(e.response);
                }
            )
    }

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Cover
                    source={{
                        uri: 'https://industrytoday.com/wp-content/uploads/2018/12/business-3224643_1920.jpg'
                    }}
                />
                <Card.Title
                    title="Acessar Conta"
                    subtitle="Entre com suas credenciais de acesso:"
                />
                <Card.Content>

                    {/* campo para preenchimento do login do usuário */}
                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='login'
                            rules={{
                                validate: textValidation
                            }}
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Login de Acesso"
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
                            errors.login && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.login.message}
                            </Text>
                        }

                    </View>

                    {/* campo para preenchimento da senha do usuário */}
                    <View style={{ marginBottom: 20 }}>

                        <Controller
                            control={control}
                            name='senha'
                            rules={{
                                validate: textValidation
                            }}
                            defaultValue=''
                            render={
                                ({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        label="Senha de Acesso"
                                        keyboardType="default"
                                        mode="flat"
                                        secureTextEntry={true}
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
                            errors.senha && <Text style={{
                                color: '#BB2124',
                                fontSize: 15
                            }}>
                                {errors.senha.message}
                            </Text>
                        }

                    </View>

                    {/* botão para acesso ao sistema */}
                    <View style={{ marginBottom: 20 }}>

                        <Button mode="contained" onPress={
                            handleSubmit(onSubmit)
                        }>
                            Acessar Conta
                        </Button>

                    </View>

                    {/* Informações de rodapé */}
                    <View style={{ marginBottom: 20, alignItems: 'center' }}>
                        <Text>
                            Aplicativo para controle de empresas v1.0
                        </Text>
                    </View>

                </Card.Content>
            </Card>
        </ScrollView>
    )
}