import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, Button, KeyboardAvoidingView,
        ActivityIndicator } from 'react-native'

import logo from '../../images/Logo-completa.png';

const { width, height } = Dimensions.get("screen");

import helper from './helper'





export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            password: '',
        }
    }

    async componentDidMount() {
        try{
            await helper.mount(this.props.navigation)
        }catch(error){}
        
        this.setState({isLoading: false})
    }

    render(){
        return(

            this.state.isLoading ? <ActivityIndicator style={{position: 'absolute', top: 30}}/> :

            <View style={styles.screen}>

                <StatusBar hidden={true}/>
                
                <KeyboardAvoidingView behavior="position" style={{top: '22%'}}>
                    <View style={styles.container}>
                        
                        <Image source={logo} style={{top: -20, height: 100, width: width*0.65}}/>

                        <TextInput
                            placeholder = "Digite seu email."
                            placeholderTextColor="black"
                            style={styles.input}
                            onChangeText={(email) => this.setState({email: email})}
                            elevation={10}/>

                        <TextInput
                            placeholder = "Digite sua senha."
                            placeholderTextColor="black"
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password: password})}
                            elevation={10}/>

                        <TouchableOpacity 
                            onPress={() => 
                                helper.login(this.state.email, this.state.password, this.props.navigation)
                            }
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
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Entrar</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

                <View style={{alignItems: 'center', top: height/3.5}}>
                    <Text style={{
                        fontSize: 20,
                        justifyContent: 'center',
                        color: '#AEE637'}}>Não possui uma conta?</Text>
                    <Text style={{
                            fontSize: 20,
                            justifyContent: 'center',
                            color: '#AEE637',
                            textDecorationLine: 'underline'
                        }}
                        onPress={() =>
                            this.props.navigation.navigate('Register')
                        }>
                        Registre-se!
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
        marginTop: 15,
        width: 300,
        fontSize: 16,
        backgroundColor: '#808080',
        borderRadius: 20
    }
});