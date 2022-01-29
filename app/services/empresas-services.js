import axios from "axios";
import * as config from '../config/api-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    Função para realizar o cadastro da empresa
*/
export const postEmpresa = (data) => {
    return axios.post(config.getApiUrl() + "/Empresas", data)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a atualização da empresa
*/
export const putEmpresa = (data) => {
    return axios.put(config.getApiUrl() + "/Empresas", data)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a exclusão da empresa
*/
export const deleteEmpresa = (idEmpresa) => {
    return axios.delete(config.getApiUrl() + "/Empresas/" + idEmpresa)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a consulta de todas as empresas
*/
export const getAllEmpresas = () => {
    return axios.get(config.getApiUrl() + "/Empresas")
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a consulta de 1 empresa atraves do ID
*/
export const getEmpresaById = (idEmpresa) => {
    return axios.get(config.getApiUrl() + "/Empresas/" + idEmpresa)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Função para realizar a consulta de empresas por nome fantasia
*/
export const getEmpresaByNomeFantasia = (nomeFantasia) => {
    return axios.get(config.getApiUrl() + "/Empresas/Consultar/" + nomeFantasia)
        .then(
            response => {
                return response.data;
            }
        )
}

/*
    Criando um INTERCEPTADOR para enviar automaticamente o TOKEN
    para a API quando uma requisição for feita para o ENDPOINT de Empresas
*/
axios.interceptors.request.use(
    async config => {

        //verificar se a requisição é para um serviço de Empresas
        if(config.url.includes('/api/Empresas')){

            //Incluindo o TOKEN no HEADER da requisição (Authorization)
            var accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }

        return config;
    },
    error => {
        Promisse.reject(error);
    }
);

