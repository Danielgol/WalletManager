import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox,
        KeyboardAvoidingView, Dimensions, Image } from 'react-native'

import seta from '../images/seta3.png';

import Picker from '../components/selectCurrency.js';
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
            this.setState({value: novo, auxValue: novo, showTransfer: false});
            this.postUpdate(novo, this.state.prefix);
        }
    }

    pressEdit(){
        if(this.state.auxValue != '' && this.state.auxValue != '.' && this.state.auxValue != null){
            this.setState({
            value: this.state.auxValue,
            prefix: this.state.auxPrefix,
            showEdit: false });
            this.postUpdate(this.state.auxValue, this.state.auxPrefix);
        }   
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

                    <Text style={[styles.total, {fontSize: 22, top: '25%', left: 30}]}>
                        {this.state.name}
                    </Text>

                    <Text style={[styles.total, {fontSize: 30, top: '25%', left: 30}]}
                        onPress={() =>
                        this.state.showCurrencies 
                            ? this.setState({showEdit: true, showCurrencies: false})
                            : this.setState({showEdit: true, showTransfer: false})}>
                        {this.state.prefix} {parseFloat(this.state.value).toFixed(this.state.precision)}
                    </Text>

                </View>

                <View style={{height: '1%', backgroundColor: '#606060'}}></View>

                <KeyboardAvoidingView behavior="position" style={[styles.middle, {height: '50%'}]}>

                    { this.state.showCurrencies ?
                        <Picker
                            onChoose={(curr) => this.setState({
                                auxPrefix: curr,
                                showCurrencies: false,
                                showEdit: true
                            })}
                        />
                    : null}

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
                            pressCurr={() => this.setState({showEdit: false, showCurrencies: true})}
                            handleChange={(text) => this.setState({auxValue: text})}
                        />
                    : null}

                </KeyboardAvoidingView>

                <View style={{
                    top: 20,
                    height: '30%',
                    alignItems: 'center',
                    elevation: 10,
                    backgroundColor: '#404040'}}>
                    <View>
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
        alignItems: 'center',
        elevation: 10,
    },
    total: {
        color: 'white',
        fontWeight: 'bold'
    },
    roundButton: {
        top: '60%',
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