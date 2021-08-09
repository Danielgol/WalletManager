import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, StatusBar,
        TouchableOpacity, Button, KeyboardAvoidingView} from 'react-native'

export default function Login({navigation}){

  /*
  const data = [
    {name: 'B-BRA', value: 1280.00, key: '1'},
    {name: 'CCTRF', value: 1390.00, key: '2'},
    {name: 'CAIXA', value: 4760.00, key: '3'},
    {name: 'CASA', value: 300.00, key: '4'},
    {name: 'BTC', value: 0.00502, key: '5' }
  ];
  */

  var url = "http://192.168.0.182:3000/data";

  const requestData = () => {
    var data = [];
    fetch(url)
    .then(response => response.json())
    .then((responseJson) => {
      data = responseJson;
      navigation.navigate('HomeScreen', data);
    }).catch((error) => {});
  }

  return(
    <View style={styles.screen}>

      <StatusBar hidden={true}/>

      <KeyboardAvoidingView behavior="position" style={{top: '50%'}}>
        <View style={styles.container}>

          <TextInput
            placeholder = "Digite seu email."
            placeholderTextColor = "black"
            style={styles.input}
            elevation={10}/>

          <TextInput
            placeholder = "Digite sua senha."
            placeholderTextColor="black"
            style={styles.input}
            secureTextEntry={true}
            elevation={10}/>

          <View style={{width: 150, marginTop: 20}}>
            <Button onPress={ () => requestData() }
              title="Login"
              color="#39970A"/>
          </View>

        </View>
      </KeyboardAvoidingView>

      <View style={{width: 150, top: 540}}>
        <Button onPress={() => {alert('Nothing by now :(')}}
          title="Sign In"
          color="#39970A"/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
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
  input: {
    color: 'black',
    padding: 10,
    marginTop: 15,
    width: 300,
    fontSize: 16,
    backgroundColor: '#808080',
    borderRadius: 4
  },
  botao: {
    width: 150,
    height: 46,
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
  }
});