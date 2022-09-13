import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        Dimensions, Image, Animated } from 'react-native'
import TokenManager from './tokenManager';

import seta from '../images/seta3-verde.png';
import maleta from '../images/mala-verde.png';
import CurrencyPopup from '../components/currencyPopup.js';

const { width, height } = Dimensions.get("screen");



export default class CreateMaleta extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            value: '0.00',
            prefix: 'BRL',
            precision: 2,
            showCurrencies: false,
        }
        this.popUpScale = new Animated.Value(0);
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if(this.state.showCurrencies == true){
            this.setState({showCurrencies: false});
            return true;
        }
        return false;
    }

    isCripto(){
        if(this.state.prefix == 'BTC' || this.state.prefix == 'ETH'){
            return true;
        }
        return false;
    }

    convertPrefix(){
        const prefix = this.state.prefix;

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

    async createMaleta(){
        var email = ''
        var token = ''
        try{
            const token = await TokenManager.getToken();

            const name = this.state.name;
            const value = this.state.value;
            const prefix = this.state.prefix;

            const resp = await fetch('https://fintrack-express.herokuapp.com/createMaleta', {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    name: name,
                    value: value,
                    prefix: prefix,
                })
            }).then(response => {
                if (response.status === 401 || response.status === 403) {
                    TokenManager.removeToken()
                }else if(response.status === 201){
                    const params = this.props.route.params;
                    params.refresh();
                    this.props.navigation.goBack(null)
                    return {message: "Maleta criada com sucesso!"};
                }else{
                    return response.json();
                }
            }).then(response => {
                return response.message;
            }).catch((error) => {
                return null;
            })

            if(resp){
                alert(resp);
            }else{
                //alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }

        }catch(error){}
    }

    /*
    pressCreate(){
        if(this.state.value != ''
            && this.state.value != '.'
            && this.state.value != null
            && this.state.name != ''){
            this.postUpdate(this.state.name, this.state.value, this.state.prefix);
            this.props.navigation.navigate('HomeScreen');
        }
    }
    */

    emerge(shows, scale){
        this.setState(shows);
        Animated.timing(scale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    }

    handleEditChange(amount){
        var aux = amount;
        aux = aux.replace('.','');
        aux = aux.replace(',','');
        if (/^\d+$/.test(aux) || aux === '') {
            this.setState({value: amount.replace(',','') });
        }
    }


    render(){

        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                {/* ----------- POPUP BACKGROUND ----------- */}
                { this.state.showCurrencies ?
                    <View style={{position: 'absolute', top: 0, width: width, height: height,
                    backgroundColor: 'black', elevation: 10, opacity: 0.5, zIndex: 1}}></View>
                : null
                }


                {/* ----------- HEADER ----------- */}
                <View style={{height: '10%'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            top: 20,
                            left: 25,
                            width: 40,
                            justifyContent: 'center',
                        }}>
                        <Image source={seta} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>
                        {/*
                    <View style={[styles.middle, {fontWeight: 'bold'}]}>
                        <Image source={maleta} style={{height: 40, width: 40}}/>
                        <Text style={{color: '#AEE637', fontSize: width/22}}>
                            Criação de Maleta
                        </Text>
                    </View>
                    */}
                </View>


                {/* ----------- BODY ----------- */}
                <View style={{alignItems: 'center', height: height}}>
                    
                    <View style={{alignItems: 'flex-start'}}>
                        <View style={{top: 10, height: 30}}>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                Digite o nome da Maleta:
                            </Text>
                        </View>

                        <View style={{top: 10, height: 80}}>
                            <TextInput
                                borderRadius={8}
                                padding={10}
                                fontSize={20}
                                width={width*0.7}
                                elevation={4}
                                backgroundColor='#808080'
                                onChangeText={(text) => this.setState({name: text}) }
                            />
                        </View>

                        <View style={{height: height*0.04}}>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                Selecione o tipo da Moeda/
                            </Text>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                Digite a Quantidade:
                            </Text>
                        </View>

                        <View style={{top: 20}}>
                            <View style={[styles.row]}>
                                <TouchableOpacity
                                    style={{backgroundColor: '#606060', borderRadius: 8, justifyContent: 'center'}}
                                    onPress={() => this.emerge({showCurrencies: true}, this.popUpScale) }>
                                    <Text style={{fontSize: 20, color: '#AEE637', fontWeight: 'bold'}}>  {this.state.prefix}      </Text>
                                </TouchableOpacity>

                                <TextInput
                                    left={-15}
                                    borderRadius={8}
                                    padding={10}
                                    fontSize={20}
                                    width={width*0.4}
                                    elevation={4}
                                    backgroundColor='#808080'
                                    keyboardType='numeric'
                                    onChangeText={(text) => this.handleEditChange(text) }
                                    value={this.state.value}
                                />
                            </View>
                        </View>

                    </View>

                    { this.state.showCurrencies ?
                    <Animated.View style={{position: 'absolute', width: width, height: height*0.8,
                    elevation: 11, zIndex: 2, alignItems: 'center', justifyContent: 'center',
                    transform: [{scale: this.popUpScale}]}}>
                        <CurrencyPopup 
                            cancel={() => this.setState({
                                showCurrencies: false,
                                auxPrefix: this.state.prefix,
                                auxValue: this.state.value})}
                            onChoose={(item) => this.setState({showCurrencies: false, prefix: item})}/>
                    </Animated.View>
                    : null
                    }

                    <View style={{top: '35%'}}>
                        <TouchableOpacity 
                            onPress={() => this.createMaleta() }
                            style={{
                                width: width*0.5,
                                backgroundColor: '#AEE637',
                                height: height*0.08,
                                borderRadius: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                elevation: 10,
                            }}>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>CRIAR</Text>
                        </TouchableOpacity>
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
        backgroundColor: '#40970A',
        elevation: 5,
    },row: {
        width: '100%',
        flexDirection: 'row',
    },
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);