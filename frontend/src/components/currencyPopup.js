import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Dimensions, Image} from 'react-native'
import fechar from '../images/X-laranja.png';

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


const CurrencyPopup = (props) => {
    return(
        <View style={styles.screen} >
            <TouchableOpacity onPress={() => props.navigation.goBack()}
                        style={{
                            top: 33,
                            left: 130,
                        }}>
                        <Image source={fechar} style={{height: 20, width: 20}}/>
            </TouchableOpacity>
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
        width: width*0.9,
        height: height*0.5,
        alignItems: 'center',
        backgroundColor: '#444646',
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
        height: '82%',
        flexGrow: 0
    },
    text: {
        top: 10,
        fontSize: 18, 
        color: '#AEE637'
    },
    botao: {
        width: 300,
        height: 45,
        marginTop: 5,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textoBotao: {
        color: '#AEE637',
        fontSize: 18,
    },
});

export default CurrencyPopup;