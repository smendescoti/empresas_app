import React from "react";

import Login from "./app/components/Login";
import Dashboard from "./app/components/Dashboard";
import EmpresasCadastro from "./app/components/EmpresasCadastro";
import EmpresasConsulta from "./app/components/EmpresasConsulta";
import EmpresasEdicao from "./app/components/EmpresasEdicao";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="empresas-cadastro" component={EmpresasCadastro} />
        <Stack.Screen name="empresas-consulta" component={EmpresasConsulta} />
        <Stack.Screen name="empresas-edicao" component={EmpresasEdicao} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}