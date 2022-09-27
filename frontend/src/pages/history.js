import React, {Component} from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
  TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
  KeyboardAvoidingView, Dimensions, Image, Animated } from 'react-native'
import TokenManager from './tokenManager';

import seta from '../images/seta3-verde.png';
import strings from '../utils/localization.js';

const { width, height } = Dimensions.get("screen");

export default class History extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          _id: this.props.route.params._id,
          name: this.props.route.params.name,
          registros: [],
          color: '#40970A',
          text: '0.00',
          points: [],
      }
      this.popUpScale = new Animated.Value(0);
  }

  componentDidMount(){
    this.getRegistros();
  }

  componentWillUnmount() {
      // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
      this.setState = (state, callback)=>{
          return;
      };
  }

  getPrecision(item) {
    var precision = 2;
    if(item.prefix === 'BTC' || item.prefix === 'ETH'){
      precision = 8;
    }
    return precision;
  }

  currencyFormat(item) {
    if(item.prefix != 'BTC' && item.prefix != 'ETH'){
      return parseFloat(item.value).toFixed(this.getPrecision(item))
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return parseFloat(item.value).toFixed(this.getPrecision(item))
  }

  convertPrefix(prefix) {
    if(prefix == 'BTC'){
      return 'BTC ';
    }
    if(prefix == 'ETH'){
      return 'ETH ';
    }
    if(prefix == 'BRL'){
      return 'R$';
    }
    if(prefix == 'USD'){
      return '$';
    }
    if(prefix == 'EUR'){
      return '€';
    }
    if(prefix == 'GBP'){
      return '£';
    }
  }

  async getRegistros(){
      try{
          const token = await TokenManager.getToken();
          const resp = await fetch("https://fintrack-express.herokuapp.com/getRegistros/"+this.state._id, {
              method: 'get',
              headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              })
          }).then(response => {
              if (response.status === 401 || response.status === 403) {
                TokenManager.removeToken();
                return null;
              }else{
                return response.json()
              }
          }).then((responseJson) => {
              return responseJson;
          }).catch((error) => {
              return null;
          })

          if(resp){
              this.setState({registros: resp});
          }else{
              this.props.navigation.navigate('Login');
              return;
          }
      }catch(error){}
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
                        <Image source={seta} style={{height: height*0.05, width: width*0.08}}/>
          </TouchableOpacity>
  
          <View style={{top: -10}}>
                        
            <View style={{alignSelf: 'center'}}>
                <Text style={{color: '#AEE637', fontSize: width/22}}>
                    {strings.historc} 
                </Text>
            </View>
            <View style={{alignSelf: 'center', marginTop: 20}}>
                <Text style={{color: '#AEE637', fontSize: width/14}}>
                    {this.state.name}
                </Text>
            </View>
          </View>
        </View>

      <View style={{height: 10}}></View>

      {/* ----------- LISTA ----------- */}
      <FlatList
        data={this.state.registros}
        style={{bottom: 10}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.botao}
            elevation={30}>
            <View style={styles.row}>

              <Text style={[styles.textoBotao, {
                  color: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? '#BFF111' : '#AEE637'),
                  fontWeight: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'bold' : 'normal'),
                }]}>
                  {this.convertPrefix(item.prefix)} {this.currencyFormat(item)}
              </Text>

              <Text style={[styles.textoBotao, {color: '#AEE637'}]}> {item.descricao} </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
  row: {
      width: '100%',
      paddingVertical: 25,
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  botao: {
      width: width*1,
      height: height*0.075,
      marginTop: 8,
      backgroundColor: '#272727',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      elevation: 5,
  },
  textoBotao: {
      color: 'white',
      fontSize: width/22,
  },
});