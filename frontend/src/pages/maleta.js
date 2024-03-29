import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        KeyboardAvoidingView, Dimensions, Image, Animated, Alert } from 'react-native'

import seta from '../images/seta3-verde.png';
import historico from '../images/historico.png';
import mais from '../images/mais-padrao.png';
import lixo from '../images/lixo.png';
import strings from '../utils/localization.js';

import CurrencyChart from '../components/currencyChart.js';
import TransferPopUp from '../components/transferPopup';

const { width, height } = Dimensions.get("screen");
const site = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=";
const currency = "usd";
const settings = "&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=";
const price_change_percentage = "7d";
const url = site + currency + settings + price_change_percentage;

const api = "https://fintrack-express.herokuapp.com/"

import TokenManager from './tokenManager';



export default class Maleta extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            _id: this.props.route.params._id,
            name: this.props.route.params.name,
            value: this.props.route.params.value,
            prefix: this.props.route.params.prefix,

            precision: this.props.route.params.precision,
            showTransfer: false,
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
        if(this.state.prefix === "BTC" || this.state.prefix === "ETH"){
            fetch(url).then(response => response.json()).then((responseJson) => {
                this.state.points = responseJson;
                this.setState({ isLoadingChart: false })
            }).catch((error) => {});
        }
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        //if(this.state.showCurrencies == true){
        //   this.setState({showEdit: true, showCurrencies: false});
        //} else if(this.state.showEdit == true){
        //    this.setState({showEdit: false});
        //}else
        if(this.state.showTransfer == true){
            this.setState({showTransfer: false})
        } //else if(!this.state.showEdit && !this.state.showTransfer && !this.state.showCurrencies){
        else {
            return false;
        }
        return true;
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

    currencyFormat() {
        if(this.state.prefix != 'BTC' && this.state.prefix != 'ETH'){
            return parseFloat(this.state.value).toFixed(this.state.precision)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        return parseFloat(this.state.value).toFixed(this.state.precision)
    }

    async postUpdate(value, prefix){
        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            const resp = await fetch(api+'createRegistro', {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    id_maleta: this.state._id,
                    descricao: 'Enviado pelo aplicativo mobile!',
                    prefix: prefix,
                    value: value,
                })
            }).then(response => {
                if (response.status === 401 || response.status === 403) {
                    TokenManager.removeToken()
                    return null;
                }else if(response.status === 201){
                    const atual = this.state.value;
                    return {value: value+atual, prefix: prefix};
                }else{
                    return response.json();
                }
            }).catch((error) => {
                return null;
            })

            if(resp){
                this.setState(resp);
            }else{
                //alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }
        }catch(error){}
    }

    async pressTransfer(){
        this.setState({showTransfer: false});

        var value = this.state.text;
        if(value != null && value != '' && value != '.'){
            //var novo = 0;
            if(this.state.signal === '+'){
                //novo = parseFloat(this.state.value) + parseFloat(value);
                value = parseFloat(value)
            }else{
                //novo = parseFloat(this.state.value) - parseFloat(value);
                value = - parseFloat(value)
            }

            try{
                await this.postUpdate(value, this.state.prefix);
            }catch(error){}
            
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

    getPrecision(prefix) {
        var precision = 2;
        if(prefix === 'BTC' || prefix === 'ETH'){
            precision = 8;
        }
        return precision;
    }

    goHistory(){
        var precision = this.getPrecision(this.state.prefix);         
        this.positionX = new Animated.Value(0);         
        this.setState({isLoading: true, showSideMenu: false});
        this.props.navigation.navigate('History', {
            _id: this.state._id,
            name: this.state.name,
        });
    }

    async deleteMaleta(){
        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            const resp = await fetch(api+"removeMaleta/"+this.state.name, { 
                method: 'delete', 
                headers: new Headers({
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
                if (response.status === 401 || response.status === 403) {
                    TokenManager.removeToken()
                }else if(response.status === 200){
                    const params = this.props.route.params;
                    params.refresh();
                    this.props.navigation.goBack(null)
                    return {message: "Maleta removida com sucesso!"};
                }else{
                    return response.json()
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

    openDeletePopUp(){
        Alert.alert(
            'Exit App',
            'Deseja excluir a Maleta?', [{
                text: 'Excluir',
                onPress: () => {this.deleteMaleta()},
            }, {
                text: 'Cancelar',
                style: 'cancel'
            },]
        )
    }




    render(){

        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                {/* ----------- POPUP BACKGROUND ----------- */}
                { //this.state.showCurrencies || this.state.showEdit || this.state.showTransfer 
                this.state.showTransfer ?
                <View style={{position: 'absolute', top: 0, width: width, height: height,
                backgroundColor: 'black', elevation: 10, opacity: 0.5, zIndex: 1}}></View>
                : null
                }

                {/* ----------- HEADER ----------- */}
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
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={{top: 10, alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity
                                    /*onPress={() => this.emerge(this.state.showCurrencies 
                                    ? {showEdit: true, showCurrencies: false}
                                    : {showEdit: true, showTransfer: false}
                                , this.popUpScale) }*/>
                                <View style={{flexDirection: 'row', right: 10}}>

                                    <View style={{justifyContent: 'flex-end', bottom: 6, right: 3}}>
                                        <Text style={{color: '#AEE637', fontSize: width/22}}>
                                            {this.convertPrefix()}
                                        </Text>
                                    </View>

                                    <View style={{justifyContent: 'flex-end'}}>
                                        <Text style={{ color: '#AEE637', fontSize: width/10}}
                                            /*onPress={() =>
                                            this.emerge(this.state.showCurrencies
                                            ? {showEdit: true, showCurrencies: false}
                                            : {showEdit: true, showTransfer: false},
                                            this.popUpScale) }*/>
                                                { this.currencyFormat() }
                                        </Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => this.openDeletePopUp()}
                                style={{
                                    alignSelf: 'flex-start',
                                    left: 25,
                                }}>
                                <Image source={lixo} style={{height: height*0.038, width: width*0.06}}/>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.goHistory()} style={{
                                    alignSelf: 'flex-end',
                                    right: 15,
                                    top: -25
                                }}>
                                <Image source={historico} style={{height: height*0.03, width: width*0.05}}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>



                {/* ----------- CHART ----------- */}
                <View style={{height: '1%'}}>
                    { ( this.state.isLoadingChart || !this.isCripto() ) ? null :
                    <View>
                        <CurrencyChart currency={this.state.prefix} points={this.state.points}/>
                    </View>
                    }
                </View>



                {/* ----------- POPUPS ----------- */}
                <KeyboardAvoidingView behavior="position" style={[styles.middle, {zIndex: 2}]}>
                    {/* this.state.showCurrencies ?
                        <Animated.View style={[styles.middle, {top: 10, elevation: 10, transform: [{scale: this.popUpScale}]}]}>
                            <CurrencyPopup 
                            cancel={() => this.setState({
                                showCurrencies: false,
                                showEdit: true,
                                auxPrefix: this.state.prefix,
                                auxValue: this.state.value})}
                            onChoose={(curr) => this.setState({
                                auxPrefix: curr,
                                showCurrencies: false,
                                showEdit: true
                                }
                                )}/>
                        </Animated.View> : null
                    */}

                    { this.state.showTransfer ?
                        <Animated.View style={{top: '25%', elevation: 10, transform: [{scale: this.popUpScale}] }}>
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

                    {/*this.state.showEdit ?
                        <Animated.View style={{top: '25%', elevation: 10, transform: [{scale: this.popUpScale}]}}>
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
                    : null*/}
                </KeyboardAvoidingView>



                {/* ----------- BOTAO + ----------- */}
                <View style={{
                    top: 10,
                    right: 20,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',}}>
                    <TouchableOpacity
                        /*
                        onPress={() => this.emerge( this.state.showCurrencies
                            ? {showTransfer: true, showCurrencies: false}
                            : {showTransfer: true, showEdit: false}
                            , this.popUpScale)}>
                        */
                        onPress={() => this.emerge({showTransfer: true} , this.popUpScale)}>
                        <Image source={mais} style={{height: height*0.1, width: width*0.2}}/>
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

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);