import React, { useState } from 'react'
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Button, FlatList} from 'react-native'

export default function HomeScreen({navigation}){

  const maleta = [
    {name: 'B-BRA', value: 1280.00, key: '1'},
    {name: 'CCTRF', value: 1390.00, key: '2'},
    {name: 'CAIXA', value: 4760.00, key: '3'},
    {name: 'CASA', value: 300.00, key: '4'},
    {name: 'BTC', value: 0.00502, key: '5' }
  ];

  var total = maleta.reduce((total, object) => total + Object.values(object)[1], 0);

  return(
    <View style={styles.screen}>
      <StatusBar hidden={true}/>
      <View style={{height: '30%', justifyContent: 'center'}}>
        <Text style={styles.textoBotao}>R$ {total} </Text>
      </View>
      <FlatList
        data={maleta}
        style={{padding: 2}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.botao}
            elevation={30}>
            <View style={styles.row}>
              <Text style={styles.textoBotao}> {item.name} </Text>
              <Text style={styles.textoBotao}> {item.value} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/*
/
*/

const styles = StyleSheet.create({
  row: {
    width: '100%',
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screen: {
    flex: 1,
    backgroundColor: '#404040',
    alignItems: 'center'
  },
  container: {
    //position: 'relative',
    //top: '50%',
    backgroundColor: '#404040',
    alignItems: 'center'
  },
  botao: {
    width: 350,
    height: 70,
    marginTop: 20,
    backgroundColor: '#505050',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  textoBotao: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  item: {
    fontSize: 16,
    backgroundColor: 'white'
  }
});