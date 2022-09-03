
import { AsyncStorage } from 'react-native';

const TokenManager = {

    getToken: async function() {
        var email = ''
        var token = ''
        try{
            email = await AsyncStorage.getItem('email');
            token = await AsyncStorage.getItem('token');
        }catch (error) {}
        return token;
    },

    setToken: async function(email, token) {
        try {
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('token', token);
        } catch (error) {}
    },

    removeToken: async function(){
        try {
            AsyncStorage.removeItem('email');
            AsyncStorage.removeItem('token');
        } catch (error) {}
    }

}

export default TokenManager;
