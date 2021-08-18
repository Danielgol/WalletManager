import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';


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


class CurrencyChart extends React.PureComponent{
    render(){
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

        return(
            <View style={styles.screen}>
                <LineChart
                    style={{ top: 10, height: '80%', width: '90%'}}
                    data={data}
                    contentInset={{ top: 30, bottom: 30 }}
                    svg={{ stroke: '#40970A', strokeWidth: 2.4}}
                    curve={shape.curveMonotoneX}
                    >
                </LineChart>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        height: height*0.3,
        width: width*0.98,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: '#ddd'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default CurrencyChart;