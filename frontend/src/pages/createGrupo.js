import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox, BackHandler,
        Dimensions, Image, Animated } from 'react-native';

import seta from '../images/seta3-verde.png';
import CurrencyPopup from '../components/currencyPopup.js';

const { width, height } = Dimensions.get("screen");



export default class CreateGrupo extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            value: '0.00',
            prefix: 'BRL',
            precision: 2,
            showCurrencies: false,
            bags: this.props.route.params.bags,
            selecteds: [],
        }
        this.popUpScale = new Animated.Value(0);
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();
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
        if(prefix == 'JPY'){
            return '¥';
        }
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

    postUpdate(name, prefix, bags){
        fetch('http://192.168.0.182:3000/postCreateCounter', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                prefix: prefix,
                bags: bags,
            })
        }).then(response => {
        }).catch(error => {
            console.error(error);
        });
    }

    pressCreate(){
        if(this.state.selecteds.length > 0 && this.state.name != '') {
            this.postUpdate(this.state.name, this.state.prefix, this.state.selecteds);
            this.props.navigation.navigate('HomeScreen');
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

    handleEditChange(amount){
        var aux = amount;
        aux = aux.replace('.','');
        aux = aux.replace(',','');
        if (/^\d+$/.test(aux) || aux === '') {
            this.setState({value: amount.replace(',','') });
        }
    }

    handleCheckBox(item){
        var list = this.state.selecteds;

        if(list.includes(item.key)) {
            this.state.selecteds = list.filter(elem => elem !== item.key);
        }else{
            list = list.push(item.key);
        }
        this.setState({});
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


                {/* ----------- BODY ----------- */}
                <View style={{alignItems: 'center', height: height}}>
                    <View style={{alignItems: 'flex-start'}}>

                        <View style={{top: 10, height: 30}}>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                Digite o nome do Contador:
                            </Text>
                        </View>

                        <View style={[styles.row, {top: 10, height: width*0.12}]}>
                            <TouchableOpacity
                                style={{backgroundColor: '#606060', borderRadius: 8, justifyContent: 'center'}}
                                onPress={() => this.emerge({showCurrencies: true}, this.popUpScale) }>
                                <Text style={{fontSize: 20, color: '#AEE637', fontWeight: 'bold'}}>  {this.state.prefix}      </Text>
                            </TouchableOpacity>

                            <TextInput
                                left={-18}
                                borderRadius={8}
                                padding={10}
                                fontSize={20}
                                width={width*0.6}
                                elevation={4}
                                backgroundColor='#808080'
                                onChangeText={(text) => this.setState({name: text}) }
                            />
                        </View>

                        <View style={{top: 30, height: height*0.04}}>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                Selecione
                            </Text>
                            <Text style={{color: '#AEE637', fontSize: width*0.04}}>
                                as Maletas do Contador:
                            </Text>
                        </View>

                        <View style={{top: 50, height: '55%'}}>
                            <FlatList
                                data={this.state.bags}
                                renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.botao, {
                                        backgroundColor: this.state.selecteds.includes(item.key) ? 
                                        '#40970A' : '#606060'
                                    }]}
                                    onPress={() => this.handleCheckBox(item)}
                                    elevation={30}>
                                    <View>
                                        <Text style={styles.textoBotao}> {item.name} </Text>
                                    </View>
                                </TouchableOpacity>
                                )}
                            />
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

                    <View style={{bottom: 25, alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => this.pressCreate() }
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
    botao: {
        width: width*0.8,
        height: height*0.05,
        marginTop: 8,
        backgroundColor: '#909090',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 5,
    },
    textoBotao: {
        color: '#AEE637',
        fontSize: width/22,
        paddingLeft: 20,
    },
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);