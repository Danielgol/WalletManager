
import TokenManager from '../tokenManager';


// LOGIN

const helper = {

    mount: async function(navigation) {
        try {
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            fetch('https://fintrack-express.herokuapp.com/auth', {
                method: 'get',
                headers: new Headers({
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
                if(response.status === 200){
                    //this.props.navigation.navigate('HomeScreen')
                    navigation.navigate('HomeScreen')
                }else{
                    // Ver questão do token inspirado
                    TokenManager.removeToken();
                    //this.setState({isLoading: false})
                }
            })
        } catch (error) {
            //this.setState({isLoading: false})
        }
    },

    login: async function(email, password, navigation) {
        await fetch('https://fintrack-express.herokuapp.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }).then(response => response.json()).then(response => {
            if(!response.hasOwnProperty('message')){
                const email = response.email
                const token = response.token
                try {
                    TokenManager.setToken(email, token);
                    navigation.navigate('HomeScreen')
                } catch (error) {}
            }else{
                alert(response.message)
            }
        })
    },

}

export default helper;