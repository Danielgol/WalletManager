import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions, Image } from 'react-native';
import mais from '../images/mais-verde.png';
import menos from '../images/menos.png';

const { width, height } = Dimensions.get("screen");


function handleTransferChange(amount, props){
    var aux = amount;
    aux = aux.replace('.','');
    aux = aux.replace(',','');
    if (/^\d+$/.test(aux) || aux === '') {
        props.handleChange(amount.replace(',',''));
    }
}

function changeSign(props){
    if(props.signal === '+'){
        props.changeSign({ signal: '-', color: '#BB0000'});
    } else {
        props.changeSign({ signal: '+', color: '#40970A'});
        x = menos;
    }
}


const TransferPopUp = (props) => {

    return(
        

        <View style={styles.screen}>
            <View style={[styles.row, {top: -40}]}>
                <Text style={{color: '#AEE637', fontSize: width/22}}>
                    Movimentação Financeira
                </Text>
            </View>


            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.signButtom,{backgroundColor: props.color}]}
                    onPress={() => changeSign(props) }>
                    {props.signal === '+' && <Image source={mais} style={{height: 50, width: 50}}/>}
                    {props.signal === '-' && <Image source={menos} style={{height: 50, width: 50}}/>}
                    {/*<Image source={x} style={{height: 25, width: 25}}/>*/}
                </TouchableOpacity>

                <TextInput
                    //autoFocus={true}
                    borderRadius={8}
                    padding={10}
                    fontSize={20}
                    width={200}
                    elevation={4}
                    backgroundColor='#808080'
                    keyboardType='numeric'
                    onChangeText={ (text) => handleTransferChange(text, props) }
                    value={ props.value }
                />
            </View>

            <View style={[styles.row, {top: 40}]}>
                <View style={{width: width/2.8}}>
                    <Button
                        onPress={() => props.cancel() }
                        title="Cancelar"
                        color="#FF8C00"
                    />
                </View>
                <View style={{width: width/2.8}}>
                    <Button
                        onPress={() => props.pressTransfer() }
                        title="Salvar"
                        color="#40970A"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: width*0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#303030',
        height: 250,
        borderRadius: 20,
        elevation: 10,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signButtom: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120,
        right: 15,
        elevation: 5
    },
});

export default TransferPopUp;