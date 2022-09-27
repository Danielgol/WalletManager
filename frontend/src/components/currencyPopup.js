import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, Dimensions, Image} from 'react-native'
import fechar from '../images/X-laranja.png';
import strings from '../utils/localization.js';

const { width, height } = Dimensions.get("screen");

const group = [
    {value: strings.real, key: 'BRL'},
    {value: strings.dolar, key: 'USD'},
    {value: strings.euro, key: 'EUR'},
    {value: strings.libra, key: 'GBP'},
    {value: 'Bitcoin', key: 'BTC'},
    {value: 'Etherium', key: 'ETH'},
];

const CurrencyPopup = (props) => {
    return(
        <View style={styles.screen} >
            <TouchableOpacity onPress={() => props.cancel()}
                        style={{
                            top: 33,
                            left: width*0.33,
                        }}>
                        <Image source={fechar} style={{height: 35, width: 35}}/>
            </TouchableOpacity>
            <Text style={styles.text}> {strings.select} {strings.selectCoin} </Text>
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
        height: height*0.8,
        width: width*0.8,
        flexGrow: 0
    },
    text: {
        top: 10,
        fontSize: width*0.05, 
        color: '#AEE637'
    },
    botao: {
        width: width*0.8,
        height: height*0.055,
        marginTop: 5,
        backgroundColor: '#272727',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textoBotao: {
        color: '#AEE637',
        fontSize: width*0.05,
    },
});

export default CurrencyPopup;