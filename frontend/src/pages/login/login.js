import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, Button, KeyboardAvoidingView,
        ActivityIndicator } from 'react-native'

import logo from '../../images/Logo-completa.png';

const { width, height } = Dimensions.get("screen");

import helper from './helper'

import strings from '../../utils/localization.js';


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
                
                <KeyboardAvoidingView behavior="padding" style={{top: '22%'}}>
                    <View style={styles.container}>
                        <Image source={logo} style={{ height: height*0.13, width: width*0.65}}/>

                        <TextInput
                            placeholder = {strings.loginEmailLabel}
                            placeholderTextColor="black"
                            style={styles.input}
                            onChangeText={(email) => this.setState({email: email})}
                            elevation={10}/>

                        <TextInput
                            placeholder = {strings.loginPasswordLabel}
                            placeholderTextColor="black"
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password: password})}
                            elevation={10}/>

                    </View>
                </KeyboardAvoidingView>

                <View style={{alignItems: 'center', top: height/6}}>
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
                            <Text style={{fontSize: width*0.05, fontWeight: 'bold'}}>{strings.buttonEnter}</Text>
                        </TouchableOpacity>
                    <Text style={{
                        fontSize: width*0.05,
                        justifyContent: 'center',
                        color: '#AEE637'}}>{strings.noAccount}</Text>
                    <Text style={{
                            fontSize: width*0.05,
                            justifyContent: 'center',
                            color: '#AEE637',
                            textDecorationLine: 'underline'
                        }}
                        onPress={() =>
                            this.props.navigation.navigate('Register')
                        }>
                        {strings.registerNow}
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
        width: width*0.8,
        fontSize: width*0.035,
        backgroundColor: '#808080',
        borderRadius: 20
    }
});