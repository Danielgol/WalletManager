import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Dimensions } from 'react-native'


const { width, height } = Dimensions.get("screen");


const group = [
    {value: 'Bitcoin', key: 'BTC'},
    {value: 'Dólar Americano', key: 'USD'},
    {value: 'Dólar Australiano', key: 'AUD'},
    {value: 'Dólar Canadense', key: 'CAD'},
    {value: 'Euro', key: 'EUR'},
    {value: 'Iene Japonês', key: 'JPY'},
    {value: 'Libra Esterlina', key: 'GBP'},
    {value: 'Peso Argentino', key: 'ARS'},
    {value: 'Peso Chileno', key: 'CLP'},
    {value: 'Rand Sul-Africano', key: 'ZAR'},
    {value: 'Real Brasileiro', key: 'BRL'},
    {value: 'Renminbi Chinês', key: 'CNY'},
    {value: 'Rublo Russo', key: 'RUB'},
    {value: 'Rupia Indiana', key: 'INR'},
    {value: 'Won Sul-Coreano', key: 'KRW'},
];


const Picker = (props) => {
    return(
        <View style={styles.screen} >
            <Text style={styles.text}> Selecione a Moeda </Text>
            <FlatList 
                data={group}
                style={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => props.onChoose(item.key) }>
                        <View style={styles.row}>
                            <Text style={styles.textoBotao}> {item.value} </Text>
                            <Text style={styles.textoBotao}> {item.key} </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        top: '30%',
        width: width*0.9,
        height: '350%',
        alignItems: 'center',
        backgroundColor: '#303030',
        borderRadius: 20,
        elevation: 10,
    },
    row: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    list: {
        top: 25,
        height: '74%',
        flexGrow: 0
    },
    text: {
        top: 10,
        fontSize: 18, 
        color: 'white'
    },
    botao: {
        width: 300,
        height: 45,
        marginTop: 20,
        backgroundColor: '#505050',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textoBotao: {
        color: 'white',
        fontSize: 18,
    },
});

export default Picker;