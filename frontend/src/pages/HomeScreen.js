import React, { useState } from 'react'
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, Button, FlatList} from 'react-native'

export default function HomeScreen({navigation}){

  const [money, quant] = useState([
    {name: 'B-BRA', key: '1280'},
    {name: 'CCTRF', key: '1390'},
    {name: 'CAIXA', key: '4760'},
    {name: 'CASA', key: '300'},
    {name: 'BTC', key: '0,00502'},
  ]);

  return(
    <View style={styles.screen}>
      <StatusBar hidden={true}/>
      <View style={{height: '30%'}}/>
      <FlatList
        data={money}
        style={{padding: 2}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.botao}
            elevation={30}>
            <View style={styles.row}>
              <Text> {item.name} </Text>
              <Text> {item.key} </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/*
//
<TouchableOpacity
  style={styles.botao}
  elevation={30}>
  <Text style={styles.textoBotao}> Login </Text>
</TouchableOpacity>
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
    backgroundColor: '#39970A',
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