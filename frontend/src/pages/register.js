import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, Button, KeyboardAvoidingView, } from 'react-native'

import logo from '../images/Logo-completa.png';

const { width, height } = Dimensions.get("screen");


export default class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    async register(){
        try{
            await fetch('https://fintrack-express.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                })
            }).then(response => {
                if(response.status === 201){
                    alert("Conta criada com sucesso!");
                    this.props.navigation.navigate('Login');
                }else{
                    return response.json();
                }
            }).then(responseJson =>{
                alert(responseJson.message);
            })
        }catch{}
    }

    render(){
        return(

            <View style={styles.screen}>

                <StatusBar hidden={true}/>
                
                <KeyboardAvoidingView behavior="padding" style={{top: '10%'}}>
                    <View style={styles.container}>
                        
                        <Image source={logo} style={{top: -20, height: 100, width: width*0.65}}/>

                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: 15, textAlign: 'left', width: width*0.75}}>Nome:</Text>
                        <TextInput
                            placeholder = "Digite seu nome."
                            onChangeText={(name) => this.setState({name: name})}
                            placeholderTextColor="black"
                            style={styles.input}
                            elevation={10}/>

                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: 15, textAlign: 'left', width: width*0.75}}>Email</Text>
                        <TextInput
                            placeholder = "Digite seu email."
                            onChangeText={(email) => this.setState({email: email})}
                            placeholderTextColor="black"
                            style={styles.input}
                            elevation={10}/>
                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: 15, textAlign: 'left', width: width*0.75}}>Senha</Text>
                         <TextInput
                            placeholder = "Digite sua senha."
                            onChangeText={(password) => this.setState({password: password})}
                            placeholderTextColor="black"
                            style={styles.input}
                            secureTextEntry={true}
                            elevation={10}/>

                        

                    </View>
                </KeyboardAvoidingView>

                <View style={{alignItems: 'center', top: height/6}}>
                    <TouchableOpacity 
                            onPress={() => this.register()}
                            style={{
                                marginTop: 20,
                                width: width*0.5,
                                backgroundColor: '#AEE637',
                                height: height*0.08,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 5,
                                elevation: 10,
                            }}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Registrar-se</Text>
                        </TouchableOpacity>
                    <Text style={{fontSize: 20, justifyContent: 'center', color: '#AEE637'}}>Já possui uma conta?</Text>
                    <Text
                        style={{fontSize: 20, justifyContent: 'center', color: '#AEE637', textDecorationLine: 'underline'}}
                        onPress={() => 
                            this.props.navigation.navigate('Login')
                        }>
                        Faça Login!
                    </Text>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#404040'
    },
    container: {
        height: '50%',
        alignItems: 'center'
    },
    input: {
        color: 'black',
        padding: 10,
        marginTop: 0,
        marginBottom: 5,
        width: 300,
        fontSize: 16,
        backgroundColor: '#808080',
        borderRadius: 20
    }
});