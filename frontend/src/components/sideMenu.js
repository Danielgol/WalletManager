import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Image } from 'react-native'

import logo from '../images/FinTrack-android-icon.png';
import editar from '../images/editar.png';
import mala from '../images/mala-preta.png';
import grupo from '../images/grupo-preto.png';
import sobre from '../images/info.png';
import sair from '../images/sair.png';

const SideMenu = (props) => {
    return(
        <View style={styles.screen}>

            <Image source={logo} style={styles.logo}/>

            <View style={{top: '20%', left: 10}}>
                {/*{button('Apagar', editar, 'EditPerfil', props)}*/}
                {button('Criar Grupo', grupo, 'CreateGrupo', props)}
                {button('Criar Maleta', mala, 'CreateMaleta', props)}
                {button('Sobre', sobre, 'SobreNos', props)}
                {button('Sair', sair, 'Login', props)}  
                
            </View>
        </View>
    );
}

function action(page, props) {
    if(page === 'CreateGrupo') {
        props.navigation.navigate(page,{refresh: props.refresh, bags: props.bags})
    }else if(page === 'CreateMaleta') {
        props.navigation.navigate(page,{refresh: props.refresh});
    }else if(page === 'SobreNos'){
       props.navigation.navigate(page)
    }else{
        props.navigation.navigate(page)
    }
}

const button = (title, image, page, props) =>{

    return(
        <TouchableOpacity
            onPress={() => action(page, props)}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: '#AEE637',
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 8,
                marginTop: 15,
                elevation: 10,
            }}>

                <Image source={image} style={{width: 30, height: 30}}/>

            <Text style={{
                color: '#47525e',
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
        width: 85,
        height: 85,
    }
});

export default SideMenu;