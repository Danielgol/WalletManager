import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, Button, KeyboardAvoidingView} from 'react-native'

import logo from '../images/logo.png';

const { width, height } = Dimensions.get("screen");


export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <KeyboardAvoidingView behavior="position" style={{top: '22%'}}>
                    <View style={styles.container}>
                        
                        <Image source={logo} style={{top: -20, height: 100, width: 100}}/>

                        <TextInput
                            placeholder = "Digite seu email."
                            placeholderTextColor="black"
                            style={styles.input}
                            elevation={10}/>

                        <TextInput
                            placeholder = "Digite sua senha."
                            placeholderTextColor="black"
                            style={styles.input}
                            secureTextEntry={true}
                            elevation={10}/>

                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('HomeScreen')}
                            style={{
                                marginTop: 20,
                                width: width*0.5,
                                backgroundColor: 'white',
                                height: height*0.08,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: 5,
                                elevation: 10,
                            }}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LOG IN</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>

                <View style={{alignItems: 'center', top: height/3.5}}>
                    <TouchableOpacity 
                        onPress={() => {alert('Nothing by now :(')}}
                        style={{
                            marginTop: 20,
                            width: width*0.5,
                            backgroundColor: '#ccaa44',
                            height: height*0.08,
                            borderRadius: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: 5,
                            elevation: 10,
                        }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
                    </TouchableOpacity>
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