import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar, Dimensions,
        Image , TouchableOpacity, ScrollView, Button, KeyboardAvoidingView} from 'react-native'

import logo from '../images/Logo-completa.png';
import daniel from '../images/daniel.png';
import diego from '../images/diego.jpg';
import joao from '../images/joao.jpg';
import seta from '../images/seta3-verde.png';
import linha from '../images/linha.png';
const { width, height } = Dimensions.get("screen");


export default class Login extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(

            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <ScrollView>
                    <View style={{height: 20}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
                            style={{
                                top: 20,
                                left: 25,
                                width: 40,
                                justifyContent: 'center',
                            }}>
                            <Image source={seta} style={{height: 35, width: 35}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                        <Image source={logo} style={{top: 40, height: 100, width: width*0.65, alignItems: 'center'}}/>
                    </View>
    
                    <View style={styles.container}>
                        <Text style={{fontSize: 30, justifyContent: 'center', color: '#AEE637', marginTop: 50}}>Quem somos?</Text>
                        <Text style={{fontSize: 20, textAlign: 'justify', color: '#AEE637', marginTop: 25, padding: 15}}>Nossa equipe é composta por estudantes de Bacharelado em Ciência da Computação na Universidade Federal Rural de Pernambuco (UFRPE) atuando principalmente nas seguintes funções, mas não se limitando a elas:</Text>
                        <Image source={daniel} style={styles.perfil}></Image>
                        <Text style={{width:'100%', fontSize: 20, textAlign: 'center', color: '#AEE637'}}>
                            Daniel Carneiro
                        </Text>
                        <Image source={linha} style={{height: 35, width: width*0.80}}/>
                        <Text style={{width:'100%', fontSize: 20, textAlign: 'center', color: '#AEE637'}}>
                            Desenvolvedor Back-End
                        </Text>
                        <Image source={diego} style={styles.perfil}></Image>
                        <Text style={{width:'100%', fontSize: 20, textAlign: 'center', color: '#AEE637'}}>
                            Diego Soares
                        </Text>
                        <Image source={linha} style={{height: 35, width: width*0.80}}/>
                        <Text style={{width:'100%', fontSize: 20, textAlign: 'center', color: '#AEE637'}}>
                            Desenvolvedor Front-End
                        </Text>
                        <Image source={joao} style={styles.perfil}></Image>
                        <Text style={{width: '100%', fontSize: 20, textAlign: 'center', color: '#AEE637'}}>
                            João Victor Cavalcanti
                        </Text>
                        <Image source={linha} style={{height: 35, width: width*0.80}}/>
                        <Text style={{width:'100%', fontSize: 20, textAlign: 'center', color: '#AEE637', marginBottom: 30}}>
                            UX designer
                        </Text>
                    </View>
                </ScrollView>
                

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
    },
    perfil: {
        borderRadius: 100,
        width: 200,
        height: 200,
        marginTop: 30
    }
});