import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox } from 'react-native'
import CurrencyInput from 'react-native-currency-input';

export default class Bag extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: this.props.route.params.name,
            total: this.props.route.params.value,
            saved: this.props.route.params.value,
            prefix: this.props.route.params.prefix,
            precision: this.props.route.params.precision,
            showEdit: false,
            signal: '+',
            color: '#40970A',
        }
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();
    }

    postUpdate(value){
        fetch('http://192.168.0.182:3000/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                value: value
            })
        }).then(response => {

        }).catch(error => {
            console.error(error);
        });
    }

    setValue = () => {
        this.setState({ saved: this.state.total, showEdit: false })
        this.postUpdate(this.state.total);
    }

    handleInputChange = (amount) => {
        var aux = amount;
        aux = aux.replace('.','');
        if (/^\d+$/.test(aux) || aux === '') {
            this.setState({ text: amount.replace(',','') })
        }
    }

    changeButtonColor(){
        if(this.state.signal === '+'){
            this.setState({ signal: '-', color: '#BB0000'});
        } else {
            this.setState({ signal: '+', color: '#40970A'});
        }
    }

    newTransfer(){
        var valor = this.state.text;
        if(valor != null){
            var novo = 0;
            if(this.state.signal === '+'){
                novo = this.state.total + parseFloat(valor);
            }else{
                novo = this.state.total - parseFloat(valor);
            }
            this.setState({ saved: novo, total: novo });
            this.postUpdate(novo);
        }
    }

    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <View style={{height: '22%', backgroundColor: '#505050', elevation: 10}}>
                    <Text style={[styles.total, {fontSize: 22, top: '50%',}]}> {this.state.name} </Text>
                    <Text style={[styles.total, {fontSize: 30, top: '52%',}]}
                          onPress={()=> this.setState({showEdit: true})}>
                            {' '}{this.state.prefix} {this.state.saved.toFixed(this.state.precision)}
                    </Text>
                </View>

                { /* this.state.showEdit ?
                    <View style={{alignItems: 'center'}}>
                        <TextInput
                            borderRadius={8}
                            padding={10}
                            fontSize={20}
                            width={200}
                            elevation={4}
                            backgroundColor='#909090'
                            keyboardType='numeric'
                            onChangeText={this.handleInputChange}
                            value={this.state.text}
                        />
                        <Button onPress={ this.setValue }
                            title="Clique" color="#39970A"/>
                    </View>
                : null */ }

                <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#707070', height: '50%'}}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.littleButton, {right: 15, elevation: 5, backgroundColor: this.state.color}]}
                            onPress={() => this.changeButtonColor() }>
                            <Text style={{fontWeight: 'bold', fontSize: 40}}> {this.state.signal} </Text>
                        </TouchableOpacity>

                        <TextInput
                            borderRadius={8}
                            padding={10}
                            fontSize={20}
                            width={200}
                            elevation={4}
                            backgroundColor='#909090'
                            keyboardType='numeric'
                            onChangeText={this.handleInputChange}
                            value={this.state.text}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={{width: 150}}>
                            <Button
                                onPress={() => {alert('Nothing by now :(')}}
                                title="Cancelar"
                                color="#40970A"
                            />
                        </View>
                        <View style={{width: 150}}>
                            <Button
                                onPress={() => this.newTransfer() }
                                title="Realizar"
                                color="#40970A"
                            />
                        </View>
                    </View> 

                </View>

                {/*
                <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#505050', height: '28%'}}>
                    <TouchableOpacity
                        style={styles.roundButton}>
                        <Text style={{fontWeight: 'bold', fontSize: 60}}>+</Text>
                    </TouchableOpacity>
                </View>
                */}

            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    screen: {
        flex: 1,
        backgroundColor: '#404040'
    },
    total: {
        paddingHorizontal: 25,
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    },
    roundButton: {
        marginTop: 20,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 120,
        backgroundColor: '#40970A'
    },
    littleButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 120
    },
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);