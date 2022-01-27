import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, Button } from "react-native-paper";
import Header from "./Header";

export default function Dashboard({ navigation }) {

    return (
        <ScrollView style={{ backgroundColor: '#FFF' }}>
            <Header navigation={navigation} />
            <Card>
                <Card.Cover
                    source={{
                        uri: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A347ece48-0f69-11e9-a3aa-118c761d2745?source=ig'
                    }}
                />
                <Card.Title
                    title="Dashboard principal"
                    subtitle="Indicadores gerais da aplicação"
                />
                <Card.Content>

                    <View style={{ marginTop: 10 }}>
                        <Button mode="contained" onPress={
                            () => navigation.navigate('empresas-cadastro')
                        }>
                            Cadastrar nova Empresa
                        </Button>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Button mode="contained" onPress={
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