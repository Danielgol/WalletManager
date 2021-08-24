import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Image } from 'react-native'

import logo from '../images/logo.png';
import editar from '../images/editar.png';
import grupo from '../images/grupo.png';
import contador from '../images/contador.png';
import sobre from '../images/sobre.png';

const SideMenu = (props) => {


    return(
        <View style={styles.screen}>

            <Image source={logo} style={styles.logo}/>

            <View style={{top: '35%', left: 10}}>
                {button('Editar Perfil', editar, 'CreateBag', props)}
                {button('Criar Grupo', grupo, 'CreateBag',props)}
                {button('Criar Contador', contador, 'CreateBag',props)}
                {button('Sobre', sobre, 'CreateBag', props)}
            </View>

        </View>
    );
}

const button = (title, image, page, props) =>{
    return(
        <TouchableOpacity
            onPress={() => {props.navigation.navigate(page, {refresh: props.refresh} )}}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: '#40970A',
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 8,
                marginTop: 15,
                elevation: 10,
            }}>

                <Image source={image} style={{width: 30, height: 30}}/>

            <Text style={{
                color: 'white',
                fontSize: 15,
                paddingLeft: 15,
            }}> {title} </Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
    },
    row: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        top: 30,
        left: 25,
        width: 60,
        height: 60,
    }
});

export default SideMenu;