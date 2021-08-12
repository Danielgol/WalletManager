import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar,
        TouchableOpacity, Button, KeyboardAvoidingView} from 'react-native'

export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <KeyboardAvoidingView behavior="position" style={{top: '50%'}}>
                    <View style={styles.container}>

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

                        <View style={{width: 150, marginTop: 20}}>
                            <Button onPress={() => this.props.navigation.navigate('HomeScreen')}
                                title="Login"
                                color="#39970A"/>
                        </View>

                    </View>
                </KeyboardAvoidingView>

                <View style={{width: 150, top: 540}}>
                  <Button onPress={() => {alert('Nothing by now :(')}}
                    title="Sign In"
                    color="#39970A"/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#404040',
        alignItems: 'center'
    },
    input: {
        color: 'black',
        padding: 10,
        marginTop: 15,
        width: 300,
        fontSize: 16,
        backgroundColor: '#808080',
        borderRadius: 4
    }
});