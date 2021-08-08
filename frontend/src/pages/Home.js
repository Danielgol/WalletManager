import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'

export default function Login(){
    return(
       <View style={styles.container}>
        <Text style={{color: 'white', }}> Wallet Maganager </Text>
        <TextInput placeholder = "Digite seu email." style={styles.input}/>
        <TextInput placeholder = "Digite sua senha." style={styles.input}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#404040',
    alignItems: 'center'
  },
  input: {
    marginTop: 15,
    width: 300,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4
  }
});