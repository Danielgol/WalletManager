import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions } from 'react-native';


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
    }
}


const TransferPopUp = (props) => {

    return(
        <View style={styles.screen}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.signButtom,{backgroundColor: props.color}]}
                    onPress={() => changeSign(props) }>
                    <Text style={{fontWeight: 'bold', fontSize: 40}}> {props.signal} </Text>
                </TouchableOpacity>

                <TextInput
                    //autoFocus={true}
                    borderRadius={8}
                    padding={10}
                    fontSize={20}
                    width={200}
                    elevation={4}
                    backgroundColor='#ccc'
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
                        color="#40970A"
                    />
                </View>
                <View style={{width: width/2.8}}>
                    <Button
                        onPress={() => props.pressTransfer() }
                        title="Realizar"
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