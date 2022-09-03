import React, {Component} from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
  TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
  KeyboardAvoidingView, Dimensions, Image, Animated } from 'react-native'

import seta from '../images/seta3-verde.png';

const { width, height } = Dimensions.get("screen");

export default class History extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          _id: this.props.route.params._id,
          name: this.props.route.params.name,
          value: this.props.route.params.value,
          prefix: this.props.route.params.prefix,

          precision: this.props.route.params.precision,
          
          showEdit: false,
          showTransfer: false,
          showCurrencies: false,
          isLoadingChart: true,

          signal: '+',
          color: '#40970A',
          text: '0.00',
          auxValue: this.props.route.params.value,
          auxPrefix: this.props.route.params.prefix,
          points: [],
      }
      this.popUpScale = new Animated.Value(0);
  }


  render(){
    return(
      <View style={styles.screen}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
  
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
              style={{
                  top: 20,
                  left: 25,
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
              }}>
              <Image source={seta} style={{height: 30, width: 30}}/>
          </TouchableOpacity>
  
          <View style={{top: -10}}>
                        
            <View style={{alignSelf: 'center'}}>
                <Text style={{color: '#AEE637', fontSize: width/22}}>
                    Histórico 
                </Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 20}}>
                <Text style={{color: '#AEE637', fontSize: width/14}}>
                    {this.state.name}
                </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }



}


const styles = StyleSheet.create({
  screen: {
      flex: 1,
      backgroundColor: '#303030',
  },
  header: {
      height: '22%',
      backgroundColor: '#101010',
      elevation: 8,
      borderBottomRightRadius: 22,
      borderBottomLeftRadius: 22,
  },
  middle: {
      height: height/2,
      alignItems: 'center',
      elevation: 10,
  },
  roundButton: {
      width: width/5,
      height: width/5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 120,
      backgroundColor: '#AEE637',
      elevation: 5,
  },
});