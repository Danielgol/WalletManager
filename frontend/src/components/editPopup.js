import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions } from 'react-native'


const { width, height } = Dimensions.get("screen");


function handleEditChange(amount, props){
    var aux = amount;
    aux = aux.replace('.','');
    aux = aux.replace(',','');
    if (/^\d+$/.test(aux) || aux === '') {
        props.handleChange(amount.replace(',',''));
    }
}


const EditPopUp = (props) => {
    return(
        <View style={styles.screen}>
            <View style={[styles.row]}>

                <TouchableOpacity
                    style={{backgroundColor: '#bbb', borderRadius: 8, justifyContent: 'center'}}
                    onPress={() => props.pressCurr() }>
                    <Text style={{fontSize: 20}}>  {props.auxPrefix}      </Text>
                </TouchableOpacity>

                <TextInput
                    //autoFocus={true}
                    left={-12}
                    borderRadius={8}
                    padding={10}
                    fontSize={20}
                    width={210}
                    elevation={4}
                    backgroundColor='#ccc'
                    keyboardType='numeric'
                    onChangeText={(text) => handleEditChange(text, props) }
                    value={String(props.auxValue)}
                />

            </View>

            <View style={styles.row}>
                <View style={{width: 150}}>
                    <Button
                        onPress={() => props.cancel() }
                        title="Cancelar"
                        color="#40970A"
                    />
                </View>
                <View style={{width: 150}}>
                    <Button
                        onPress={() => props.pressEdit() }
                        title="Editar"
                        color="#40970A"
                    />
                </View>
            </View> 
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        top: '30%',
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
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default EditPopUp;