import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions } from 'react-native'


const { width, height } = Dimensions.get("screen");
import SAMPLE_DATA from './data.js';


function handleEditChange(amount, props){
    var aux = amount;
    aux = aux.replace('.','');
    aux = aux.replace(',','');
    if (/^\d+$/.test(aux) || aux === '') {
        props.handleChange(amount.replace(',',''));
    }
}


const CurrencyChart = (props) => {

    return(
        <View style={styles.screen}>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: width*0.98,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#303030',
        height: height*0.3,
        borderRadius: 20,
        elevation: 10,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default CurrencyChart;