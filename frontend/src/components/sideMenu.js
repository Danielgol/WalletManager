    import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Image, Dimensions } from 'react-native';

import TokenManager from '../pages/tokenManager';
import strings from '../utils/localization.js';

import logo from '../images/FinTrack-android-icon.png';
import editar from '../images/editar.png';
import mala from '../images/mala-preta.png';
import grupo from '../images/grupo-preto.png';
import sobre from '../images/info.png';
import sair from '../images/sair.png';

const { width, height } = Dimensions.get("screen");

const SideMenu = (props) => {
    return(
        <View style={styles.screen}>
            <Image source={logo} style={styles.logo}/>

            <View style={{top: '20%', left: 10}}>
                {/*{button('Apagar', editar, 'EditPerfil', props)}*/}
                {button(strings.createGroup, grupo, 'CreateGrupo', props)}
                {button(strings.createBag, mala, 'CreateMaleta', props)}
                {button(strings.about, sobre, 'SobreNos', props)}
                {button(strings.logoff, sair, 'Login', props)}
            </View>
        </View>
    );
}

function action(page, props) {
    if(page === 'CreateGrupo') {
        props.navigation.navigate(page,{refresh: props.refresh, maletas: props.maletas})
    }else if(page === 'CreateMaleta') {
        props.navigation.navigate(page,{refresh: props.refresh});
    }else if(page === 'SobreNos'){
       props.navigation.navigate(page)
    }else{
        try {
            TokenManager.removeToken();
            props.navigation.navigate(page);
        }catch(exception) {}
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
                height: height*0.05,
                width: width*0.5
                
            }}>

                <Image source={image} style={{width: 30, height: 30}}/>

            <Text style={{
                color: '#47525e',
                fontSize: width*0.03,
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
        width: 150,
        height: 150,
    }
});

export default SideMenu;