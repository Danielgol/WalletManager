import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, Button, KeyboardAvoidingView, } from 'react-native'

import logo from '../images/Logo-completa.png';

import strings from '../utils/localization.js';

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
                
                <View behavior="padding" style={{top: '10%'}}>
                    <View style={styles.container}>
                        
                        <Image source={logo} style={{top: -20, height: height*0.12, width: width*0.65}}/>

                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: width*0.042, textAlign: 'left', width: width*0.75}}>{strings.registerName}:</Text>
                        <TextInput
                            placeholder = {strings.registerNameLabel}
                            onChangeText={(name) => this.setState({name: name})}
                            placeholderTextColor="black"
                            style={styles.input}
                            elevation={10}/>

                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: width*0.042, textAlign: 'left', width: width*0.75}}>{strings.registerEmail}</Text>
                        <TextInput
                            placeholder = {strings.registerEmailLabel}
                            onChangeText={(email) => this.setState({email: email})}
                            placeholderTextColor="black"
                            style={styles.input}
                            elevation={10}/>
                        <Text style={{color: '#AEE637', marginBottom: 3, fontSize: width*0.042, textAlign: 'left', width: width*0.75}}>{strings.registerPassword}</Text>
                         <TextInput
                            placeholder = {strings.registerPasswordLabel}
                            onChangeText={(password) => this.setState({password: password})}
                            placeholderTextColor="black"
                            style={styles.input}
                            secureTextEntry={true}
                            elevation={10}/>

                        

                    </View>
                </View>

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
                            <Text style={{fontSize: width*0.045, fontWeight: 'bold'}}>{strings.registerButton}</Text>
                        </TouchableOpacity>
                    <Text style={{fontSize: width*0.045, justifyContent: 'center', color: '#AEE637'}}>{strings.hasAccount}</Text>
                    <Text
                        style={{fontSize: width*0.045, justifyContent: 'center', color: '#AEE637', textDecorationLine: 'underline'}}
                        onPress={() => 
                            this.props.navigation.navigate('Login')
                        }>
                        {strings.logNow}
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
        width: width*0.8,
        fontSize: width*0.035,
        backgroundColor: '#808080',
        borderRadius: 20
    }
});