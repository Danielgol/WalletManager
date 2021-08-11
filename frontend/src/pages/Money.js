import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList, YellowBox } from 'react-native'
import CurrencyInput from 'react-native-currency-input';

export default class Money extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: this.props.route.params.name,
            total: this.props.route.params.value,
            saved: this.props.route.params.value,
            prefix: this.props.route.params.prefix,
            precision: this.props.route.params.precision,
            showEdit: false,
        }
    }

    componentWillUnmount(){
        const params = this.props.route.params;
        params.refresh();
    }

    handleInputTextChange = (newText) => {
        this.setState({ total: newText })
    }

    setValue = () => {
        this.setState({ saved: this.state.total, showEdit: false })
        fetch('http://192.168.0.182:3000/post', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                value: this.state.total
            })
        }).then(response => {

        }).catch(error => {
            console.error(error);
        });
    }

    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <View style={{height: '22%', backgroundColor: '#505050', elevation: 10}}>
                    <Text style={[styles.total, {fontSize: 22, top: '50%',}]}> {this.state.name} </Text>
                    <Text style={[styles.total, {fontSize: 30, top: '52%',}]} onPress={()=> this.setState({showEdit: true})}>
                        {' '}{this.state.prefix} {this.state.saved.toFixed(this.state.precision)}
                    </Text>
                </View>

                {this.state.showEdit ?
                    <View style={{alignItems: 'center'}}>
                        <CurrencyInput
                            padding={10}
                            value={this.state.total}
                            onChangeValue={ this.handleInputTextChange }
                            prefix={ this.state.prefix+' ' }
                            delimiter=","
                            separator="."
                            precision={this.state.precision}
                            backgroundColor="white"
                            fontSize={26}
                            width={200}
                        />
                        <Button onPress={ this.setValue }
                            title="Clique" color="#39970A"/>
                    </View>
                : null }

                <View style={{alignItems: 'center'}}></View>

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
        justifyContent: 'space-between',
    },
    screen: {
        flex: 1,
        backgroundColor: '#404040'
    },
    container: {
        //position: 'relative',
        //top: '50%',
        backgroundColor: '#404040',
        alignItems: 'center'
    },
    total: {
        paddingHorizontal: 25,
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold'
    }
});

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);