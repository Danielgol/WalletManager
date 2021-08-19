import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
        Button, FlatList, TextInput, Dimensions } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';


const { width, height } = Dimensions.get("screen");


function handleEditChange(amount, props){
    var aux = amount;
    aux = aux.replace('.','');
    aux = aux.replace(',','');
    if (/^\d+$/.test(aux) || aux === '') {
        props.handleChange(amount.replace(',',''));
    }
}


const CurrencyChart = (props) => {

    const data = props.points;
    const filter = data.filter(function equal(argument) {
        if(argument.symbol.toUpperCase() === props.currency){
            return argument;
        }
    });
    const points = filter[0].sparkline_in_7d.price;
    const daily = points.slice( (-1)*(points.length*(   7   )/7) );

    return(
        <View style={styles.screen}>
            <View style={{alignItems: 'flex-start', width: width}}>
                <Text style={{
                    top: 10,
                    left: 10,
                    color: 'white',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'}}>
                    {data[0].symbol}
                </Text>
            </View>

            <LineChart
                style={{ height: '60%', width: '95%'}}
                data={daily}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{ stroke: '#60C70F', strokeWidth: 2.4}}
                curve={shape.curveMonotoneX}
                >
            </LineChart>

            <View style={[styles.row, {top: 30, width: width}]}>

                <View>
                    <Text style={{
                        left: 10,
                        color: 'white',
                        textTransform: 'uppercase',
                        fontSize: height/47,
                    }}>
                        {'U$'} {data[0].current_price.toFixed(2)}
                    </Text>
                </View>

                <View>
                    <Text style={{
                        right: 10,
                        color: data[0].price_change_percentage_24h > 0 ? '#88C70F' : 'red',
                        textTransform: 'uppercase',
                        fontSize: height/47,
                        fontWeight: 'bold',
                    }}>
                        {data[0].price_change_percentage_24h > 0 ? '+' : null}
                        {data[0].price_change_percentage_24h.toFixed(2)}{'%'}
                    </Text>
                </View>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        height: height*0.3,
        width: width,
        backgroundColor: '#303030',
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
});

export default CurrencyChart;