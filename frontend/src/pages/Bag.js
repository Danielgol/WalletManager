import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox,
        KeyboardAvoidingView, Dimensions, Image, Animated } from 'react-native'

import seta from '../images/seta3.png';
import historico from '../images/historico.png';

import CurrencyPopup from '../components/currencyPopup.js';
import EditPopUp from '../components/editPopup';
import TransferPopUp from '../components/transferPopup';

const { width, height } = Dimensions.get("screen");


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

            signal: '+',
            color: '#40970A',
            text: '0.00',
            auxValue: this.props.route.params.value,
            auxPrefix: this.props.route.params.prefix,
        }
        this.popUpScale = new Animated.Value(0);
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();
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

    goHistory(){
        this.props.navigation.navigate('History');
    }

    emerge(shows){
        this.setState(shows);
        Animated.timing(this.popUpScale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();
    }



    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <View style={{height: '22%', backgroundColor: '#505050', elevation: 10}}>

                    <TouchableOpacity
                    onPress={() => this.props.navigation.goBack(null) }
                    style={{
                        top: 20,
                        left: 25,
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                    }}>
                    <Image source={seta} style={{height: 30, width: 30}}/>
                    </TouchableOpacity>

                    <View style={{top: '25%'}}>
                        <View style={{left: 30}}>
                            <Text style={[styles.total, {fontSize: 22}]}>
                                {this.state.name}
                            </Text>
                        </View>

                        <View style={{flexDirection: 'row', left: 30, width: width*0.86}}>
                            <TouchableOpacity style={{marginRight: 'auto'}}>
                            <Text style={[styles.total, {fontSize: 30}]} onPress={() =>
                                this.state.showCurrencies 
                                    ? this.setState({showEdit: true, showCurrencies: false})
                                    : this.setState({showEdit: true, showTransfer: false})}>
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

                <View style={{height: '1%', backgroundColor: '#606060'}}></View>

                { this.state.showCurrencies ?
                    <Animated.View style={[styles.middle, {top: 10, transform: [{scale: this.popUpScale}]}]}>
                        <CurrencyPopup onChoose={(curr) => this.setState({
                                auxPrefix: curr,
                                showCurrencies: false,
                                showEdit: true
                            })}/>
                        </Animated.View>
                : 

                <KeyboardAvoidingView behavior="position" style={[styles.middle]}>

                    { this.state.showTransfer ?
                        <TransferPopUp
                            value={this.state.text}
                            color={this.state.color}
                            signal={this.state.signal}
                            pressTransfer={() => this.pressTransfer()}
                            changeSign={(obj) => this.setState(obj)}
                            cancel={() => this.setState({showTransfer: false, text: '0.00'})}
                            handleChange={(text) => this.setState({text: text})}
                        />
                    : null}

                    {this.state.showEdit ?
                        <EditPopUp
                            auxValue={this.state.auxValue}
                            auxPrefix={this.state.auxPrefix}
                            cancel={() => this.setState({
                                showEdit: false,
                                auxPrefix: this.state.prefix,
                                auxValue: this.state.value})}
                            pressEdit={() => this.pressEdit()}
                            pressCurr={() => this.emerge({showEdit: false, showCurrencies: true})}
                            handleChange={(text) => this.setState({auxValue: text})}
                        />
                    : null}

                </KeyboardAvoidingView>

                }

                <View style={{
                    top: 20,
                    height: '30%',
                    alignItems: 'center',
                    backgroundColor: '#404040'}}>
                    <View style={{top: 20}}>
                    <TouchableOpacity
                        style={styles.roundButton}
                        onPress={() =>
                        this.state.showCurrencies
                            ? this.setState({showTransfer: true, showCurrencies: false})
                            : this.setState({showTransfer: true, showEdit: false})}>
                        <Text style={{fontWeight: 'bold', fontSize: 65}}>+</Text>
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
        backgroundColor: '#606060'
    },
    middle: {
        height: height/2,
        alignItems: 'center',
        elevation: 10,
    },
    total: {
        color: 'white',
        fontWeight: 'bold'
    },
    roundButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120,
        backgroundColor: '#40970A'
    },
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);