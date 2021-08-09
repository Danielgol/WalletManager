import React, { useState } from 'react'
import { View, Text, StyleSheet, StatusBar,
        TouchableOpacity, Button, FlatList} from 'react-native'

export default function Money({ route , navigation}){

  var name = route.params.name;
  var total = route.params.value;

  return(
    <View style={styles.screen}>

      <StatusBar hidden={true}/>

      <View style={{height: '22%', backgroundColor: '#505050', elevation: 10}}>
        <Text style={[styles.total, {fontSize: 22, top: '50%',}]}> {name} </Text>
        <Text style={[styles.total, {fontSize: 30, top: '52%',}]}> R$ {total.toFixed(2)} </Text>
      </View>

      <View style={{alignItems: 'center'}}>
      </View>

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
    backgroundColor: '#404040'
  },
  container: {
    //position: 'relative',
    //top: '50%',
    backgroundColor: '#404040',
    alignItems: 'center'
  },
  total: {
    paddingHorizontal: 25,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  }
});