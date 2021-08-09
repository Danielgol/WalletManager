import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar,
        TouchableOpacity, Button, FlatList, ActivityIndicator} from 'react-native'

export default function HomeScreen({route, navigation}){

  var maleta = route.params;
  var total = maleta.reduce((total, object) => total + Object.values(object)[1], 0);

  return(
    <View style={styles.screen}>

      <StatusBar hidden={true}/>

      <View style={{height: '30%', justifyContent: 'center'}}>
        <Text style={styles.textoBotao}>R$ {total.toFixed(2)} </Text>
      </View>

      <FlatList
        data={maleta}
        style={{padding: 2}}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Money', {name: item.name, value: item.value})}
            elevation={30}>
            <View style={styles.row}>
              <Text style={styles.textoBotao}> {item.name} </Text>
              <Text style={styles.textoBotao}> {item.value.toFixed(2)} </Text>
            </View>
          </TouchableOpacity>

        )}/>
    </View>
  );
}

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