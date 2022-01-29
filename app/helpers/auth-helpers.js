import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    Função para gravar o token obtido da API
    na memória do aplicativo (AsyncStorage)
*/
export const signIn = async (accessToken) => {
    try {
        await AsyncStorage.setItem('ACCESS_TOKEN', accessToken);
    }
    catch (e) {
        console.log(e);
    }
}

/*
    Função para retornar o valor do TOKEN gravado
    na AsyncStorage
*/
export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem('ACCESS_TOKEN');
    }
    catch (e) {
        console.log(e);
    }
}

/*
    Função para apagar o token gravado na AsyncStorage
*/
export const signOut = async () => {
    try {
        return await AsyncStorage.removeItem('ACCESS_TOKEN')
    }
    catch (e) {
        console.log(e);
    }
}