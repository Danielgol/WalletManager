import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        KeyboardAvoidingView, Dimensions, Image, Animated, Alert } from 'react-native'

import TokenManager from './tokenManager';

import seta from '../images/seta3-verde.png';
import historico from '../images/historico.png';
import lixo from '../images/lixo.png';

import CurrencyChart from '../components/currencyChart.js';
import CurrencyPopup from '../components/currencyPopup.js';
import EditPopUp from '../components/editPopup';
import TransferPopUp from '../components/transferPopup';

const { width, height } = Dimensions.get("screen");




export default class Grupo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            _id: this.props.route.params._id,
            name: this.props.route.params.name,
            value: this.props.route.params.value,
            prefix: this.props.route.params.prefix,
            precision: this.props.route.params.precision,

            maletas: [],
            showCurrencies: false,

            signal: '+',
            color: '#40970A',
            text: '0.00',
            points: [],
        }
        this.popUpScale = new Animated.Value(0);
    }

    componentDidMount(){
        this.load();
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
        }else if(!this.state.showEdit && !this.state.showTransfer && !this.state.showCurrencies){
            return false;
        }
        return true;
    }

    async load(){
        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }
            const resp = await fetch("https://fintrack-express.herokuapp.com/getMaletasByGrupo/"+this.state.name, { 
                method: 'get', 
                headers: new Headers({
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
                if (response.status === 401 || response.status === 403) {
                    TokenManager.removeToken()
                }else{
                    return response.json()
                }
            }).then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                return null;
            });

            if(resp){
                this.setState({maletas: resp});
            }else{
                //alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }
        }catch{}
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

    emerge(shows, scale){
        this.setState(shows);
        Animated.timing(scale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    }

    async deleteGrupo(){
        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            const resp = await fetch("https://fintrack-express.herokuapp.com/removeGrupo/"+this.state._id, { 
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
                    return {message: "Grupo removido com sucesso!"}
                }else{
                    return response.json()
                }
            }).then(response => {
                return response.message;
            }).catch((error) => {
                return null;
            });

            if(resp){
                alert(resp)
            }else{
                //alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }
        }catch(error){}
    }

    async deleteMaletaFromGrupo(item){
        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            const resp = await fetch("https://fintrack-express.herokuapp.com/removeMaletaFromGrupo/"+this.state.name+"/"+item._id, { 
                method: 'delete', 
                headers: new Headers({
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }).then(response => {
                if (response.status === 401 || response.status === 403) {
                    TokenManager.removeToken()
                }else if(response.status === 200){
                    return {message: "Maleta removida do Grupo com sucesso!"};
                }else{
                    return response.json()
                }
            }).then(response => {
                return response.message;
            }).catch((error) => {
                return null;
            });

            if(resp){
                alert(resp)
                this.load();
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
            'Deseja excluir o Grupo?', [{
                text: 'Excluir',
                onPress: () => {this.deleteGrupo()},
            }, {
                text: 'Cancelar',
                style: 'cancel'
            },]
        )
    }

    openDeleteMaletaPopUp(item){
        Alert.alert(
            'Exit App',
            'Deseja excluir a Maleta do Grupo?', [{
                text: 'Excluir',
                onPress: () => {this.deleteMaletaFromGrupo(item)},
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
                { this.state.showCurrencies ?
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
                        <Image source={seta} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>

                    <View style={{top: -10}}>

                        <View style={{alignSelf: 'center'}}>
                            <Text style={{color: '#AEE637', fontSize: width/22}}>
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={{top: 10, alignItems: 'center', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', right: 10}}>

                                <View style={{justifyContent: 'flex-end', bottom: 6, right: 3}}>
                                    <Text style={{color: '#AEE637', fontSize: width/22}}>
                                            {this.convertPrefix()}
                                    </Text>
                                </View>

                                <View style={{justifyContent: 'flex-end'}}>
                                    <Text style={{ color: '#AEE637', fontSize: width/10}}>
                                            { this.currencyFormat() }
                                    </Text>
                                </View>

                            </View>
                        </View>

                        <View>
                            <TouchableOpacity
                                onPress={() => this.openDeletePopUp()}
                                style={{
                                    alignSelf: 'flex-start',
                                    left: 25,
                                }}>
                                <Image source={lixo} style={{height: 30, width: 30}}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={{height: 10}}></View>

                {/* ----------- LISTA ----------- */}
                <FlatList
                    data={this.state.maletas}
                    style={{bottom: 10}}
                    renderItem={({ item }) => (
                        <View
                            style={styles.botao}
                            //onPress={() => this.abrirMaleta(item)}
                            elevation={30}>
                            <View style={styles.row}>
                                <Text style={[styles.textoBotao, {color: '#AEE637'}]}> {item.name} </Text>
                                <TouchableOpacity
                                    onPress={() => this.openDeleteMaletaPopUp(item)}
                                    style={{
                                        alignSelf: 'flex-start',
                                    }}>
                                    <Image source={lixo} style={{height: 30, width: 30}}/>
                                </TouchableOpacity>
                                <Text style={[styles.textoBotao, {
                                    color: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? '#BFF111' : '#AEE637'),
                                    fontWeight: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'bold' : 'normal'),
                                }]}>
                                {/*this.convertPrefix(item.prefix)} {this.currencyFormat(item)*/}
                                {item.prefix} {item.value}
                                </Text>
                            </View>
                        </View>
                     )}
                    keyExtractor={(item, index) => index.toString()}
                />

                {/* ----------- POPUPS ----------- */}
                {/*
                <KeyboardAvoidingView behavior="position" style={[styles.middle, {zIndex: 2}]}>
                    { this.state.showCurrencies ?
                        <Animated.View style={[styles.middle, {top: 10, elevation: 10, transform: [{scale: this.popUpScale}]}]}>
                            <CurrencyPopup 
                            cancel={() => this.setState({
                                showCurrencies: false,
                                showEdit: true,
                            })}
                            onChoose={(curr) => this.setState({
                                auxPrefix: curr,
                                showCurrencies: false,
                                showEdit: true})}/>
                        </Animated.View> : null
                    }
                </KeyboardAvoidingView>
                */}
                
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
    middle: {
        height: height/2,
        alignItems: 'center',
        elevation: 10,
    },
    textoBotao: {
        color: 'white',
        fontSize: width/22,
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