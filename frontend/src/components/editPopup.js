import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,
        Button, FlatList, TextInput, Dimensions } from 'react-native';



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
            
            <View style={[styles.row, {top: -40}]}>
                <Text style={{color: '#AEE637', fontSize: width/22}}>
                    Editar Valor na maleta
                </Text>
            </View>

            <View style={[styles.row]}>

                <TouchableOpacity
                    style={{backgroundColor: '#606060', borderRadius: 8, justifyContent: 'center'}}
                    onPress={() => props.pressCurr() }>
                    <Text style={{fontSize: 20, color: '#AEE637', fontWeight: 'bold'}}>  {props.auxPrefix}      </Text>
                </TouchableOpacity>

                <TextInput
                    //autoFocus={true}
                    left={-12}
                    borderRadius={8}
                    padding={10}
                    fontSize={20}
                    width={210}
                    elevation={4}
                    backgroundColor='#808080'
                    keyboardType='numeric'
                    onChangeText={(text) => handleEditChange(text, props) }
                    value={String(props.auxValue)}
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
        width: width*0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#303030',
        height: 250,
        borderRadius: 20,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default EditPopUp;