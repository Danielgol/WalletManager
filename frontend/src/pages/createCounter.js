import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        Dimensions, Image, Animated } from 'react-native'


import seta from '../images/seta3.png';
import CurrencyPopup from '../components/currencyPopup.js';
const { width, height } = Dimensions.get("screen");


export default class createCounter extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            value: 0.0,
            prefix: 'BRL',
            precision: 2,

            showCurrencies: false,

            signal: '+',
            color: '#40970A',
            text: '0.00',

            auxValue: '0.00',
            auxPrefix: 'BRL',
        }
        this.popUpScale = new Animated.Value(0);
    }

    componentDidMount(){
        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();

        //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
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
        if(prefix == 'JPY'){
            return '¥';
        }
    }

    currencyFormat() {
        if(this.state.prefix != 'BTC' && this.state.prefix != 'ETH'){
            return parseFloat(this.state.value).toFixed(this.state.precision)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        return parseFloat(this.state.value).toFixed(this.state.precision)
    }



    postUpdate(value, prefix){
        fetch('http://192.168.0.182:3000/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                value: value,
                prefix: prefix,
            })
        }).then(response => {
            this.setState({value: value, prefix: prefix});
        }).catch(error => {
            console.error(error);
        });
    }

    pressEdit(){
        if(this.state.auxValue != '' && this.state.auxValue != '.' && this.state.auxValue != null){
            var precision = 2;
            if(this.state.auxPrefix === 'BTC'){
                precision = 8;
            }
            this.setState({ showEdit: false, precision: precision});
            this.postUpdate(this.state.auxValue, this.state.auxPrefix);
        }   
    }

    emerge(shows, scale){
        this.setState(shows);
        Animated.timing(scale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
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
                </View>

                <View style={{left: 40, height: height}}>

                    <View style={{top: 10, height: 30}}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Digite o nome do Contador:
                        </Text>
                    </View>

                    <View style={{top: 25, height: 100}}>
                        <TextInput
                            left={10}
                            borderRadius={8}
                            padding={10}
                            fontSize={20}
                            width={width*0.6}
                            elevation={4}
                            backgroundColor='#ccc'
                        />
                    </View>

                    <View style={{top: 10, height: 30}}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Digite a Quantidade:
                        </Text>
                    </View>

                    <View style={{top: 25}}>
                        <TextInput
                            left={10}
                            borderRadius={8}
                            padding={10}
                            fontSize={20}
                            width={width*0.6}
                            elevation={4}
                            backgroundColor='#ccc'
                            keyboardType='numeric'
                        />
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
    },
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);