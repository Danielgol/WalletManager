import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        KeyboardAvoidingView, Dimensions, Image, Animated } from 'react-native'

import seta from '../images/seta3.png';
import historico from '../images/historico.png';

import CurrencyChart from '../components/currencyChart.js';
import CurrencyPopup from '../components/currencyPopup.js';
import EditPopUp from '../components/editPopup';
import TransferPopUp from '../components/transferPopup';

const { width, height } = Dimensions.get("screen");



const site = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=";
const currency = "usd";
const settings = "&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=";
const price_change_percentage = "7d";
const url = site + currency + settings + price_change_percentage;




export default class Bag extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            key: this.props.route.params.key,
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

    componentDidMount(){
        fetch(url).then(response => response.json()).then((responseJson) => {
            this.state.points = responseJson;
            this.setState({ isLoadingChart: false })
        }).catch((error) => {});

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {

        if(this.state.showCurrencies == true){
            this.setState({showEdit: true, showCurrencies: false});
        } else if(this.state.showEdit == true){
            this.setState({showEdit: false});
        }else if(this.state.showTransfer == true){
            this.setState({showTransfer: false})
        }else if(this.state.showEdit == false && this.state.showTransfer == false && this.state.showCurrencies == false){
            return false;
        }
        return true;
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

    pressTransfer(){
        var valor = this.state.text;
        if(valor != null && valor != '' && valor != '.'){
            var novo = 0;
            if(this.state.signal === '+'){
                novo = parseFloat(this.state.value) + parseFloat(valor);
            }else{
                novo = parseFloat(this.state.value) - parseFloat(valor);
            }
            this.setState({showTransfer: false});
            this.postUpdate(novo, this.state.prefix);
        }
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

    goHistory(){
        this.props.navigation.navigate('History');
    }




    render(){

        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                { this.state.showCurrencies || this.state.showEdit || this.state.showTransfer ?
                <View style={{position: 'absolute', top: 0, width: width, height: height,
                backgroundColor: 'black', elevation: 10, opacity: 0.5, zIndex: 1}}></View>
                : null
                }
                



                <View style={{height: '22%', backgroundColor: '#404040', elevation: 8}}>

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

                    <View style={{top: '20%'}}>

                        <View style={{left: 30}}>
                            <Text style={[styles.total, {fontSize: width/18}]}>
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', left: 30, width: width*0.86}}>
                            <TouchableOpacity style={{marginRight: 'auto'}}>
                            <Text style={[styles.total, {fontSize: width/15}]} onPress={() =>
                                this.emerge(this.state.showCurrencies 
                                    ? {showEdit: true, showCurrencies: false}
                                    : {showEdit: true, showTransfer: false}
                                , this.popUpScale) }>
                                {this.state.prefix} {parseFloat(this.state.value).toFixed(this.state.precision)}
                            </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{right: 0, top: 4}}
                                onPress={() => this.goHistory()}>
                                <Image source={historico} style={{height: 30, width: 30}}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                <View style={{height: '1%'}}>
                    { this.state.isLoadingChart ? null : <CurrencyChart points={this.state.points}/> }
                </View>




                <KeyboardAvoidingView behavior="position" style={[styles.middle, {zIndex: 2}]}>
                    { this.state.showCurrencies ?
                        <Animated.View style={[styles.middle, {top: 10, elevation: 10, transform: [{scale: this.popUpScale}]}]}>
                            <CurrencyPopup onChoose={(curr) => this.setState({
                                auxPrefix: curr,
                                showCurrencies: false,
                                showEdit: true})}/>
                        </Animated.View> : null
                    }

                    { this.state.showTransfer ?
                        <Animated.View style={[{top: '25%'}, {elevation: 10, transform: [{scale: this.popUpScale}]}]}>
                        <TransferPopUp
                            value={this.state.text}
                            color={this.state.color}
                            signal={this.state.signal}
                            pressTransfer={() => this.pressTransfer()}
                            changeSign={(obj) => this.setState(obj)}
                            cancel={() => this.setState({showTransfer: false, text: '0.00'})}
                            handleChange={(text) => this.setState({text: text})}/>
                        </Animated.View>
                    : null}

                    {this.state.showEdit ?
                        <Animated.View style={[{top: '25%'}, {elevation: 10, transform: [{scale: this.popUpScale}]}]}>
                        <EditPopUp
                            auxValue={this.state.auxValue}
                            auxPrefix={this.state.auxPrefix}
                            cancel={() => this.setState({
                                showEdit: false,
                                auxPrefix: this.state.prefix,
                                auxValue: this.state.value})}
                            pressEdit={() => this.pressEdit()}
                            pressCurr={() => this.emerge({showEdit: false, showCurrencies: true}, this.popUpScale)}
                            handleChange={(text) => this.setState({auxValue: text})}/>
                        </Animated.View>
                    : null}
                </KeyboardAvoidingView>




                <View style={{
                    top: 40,
                    right: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',}}>
                    <TouchableOpacity
                        style={[styles.roundButton]}
                        onPress={() => this.emerge( this.state.showCurrencies
                            ? {showTransfer: true, showCurrencies: false}
                            : {showTransfer: true, showEdit: false}
                            , this.popUpScale)}>
                        <Text style={{fontWeight: 'bold', fontSize: 65}}>+</Text>
                    </TouchableOpacity>
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
    middle: {
        height: height/2,
        alignItems: 'center',
        elevation: 10,
    },
    total: {
        color: 'white',
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