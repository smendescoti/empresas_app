import axios from 'axios';
import * as config from '../config/api-config';

/*
    Função para acessar o serviço de
    autenticação de usuário da API
*/
export const postLogin = (data) => {
    return axios.post(config.getApiUrl() + "/Login", data)
        .then(
            response => {
                return response.data;
            }
        )
}