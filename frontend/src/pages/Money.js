import React, { Component, useState } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput,
        TouchableOpacity, Button, FlatList} from 'react-native'
import CurrencyInput from 'react-native-currency-input';

export default class Money extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: this.props.route.params.name,
            total: this.props.route.params.value,
            saved: this.props.route.params.value,
            showEdit: false,
        }
    }

    handleInputTextChange = (newText) => {
        this.setState({ total: newText })
    }

    render(){
        return(
            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                <View style={{height: '22%', backgroundColor: '#505050', elevation: 10}}>
                    <Text style={[styles.total, {fontSize: 22, top: '50%',}]}> {this.state.name} </Text>
                    <Text style={[styles.total, {fontSize: 30, top: '52%',}]} onPress={()=> this.setState({showEdit: true})
                     }> R$ {this.state.saved.toFixed(2)}
                    </Text>
                </View>

                {this.state.showEdit ?

                    <View style={{alignItems: 'center'}}>
                        <CurrencyInput
                            padding={10}
                            value={this.state.total}
                            onChangeValue={ this.handleInputTextChange }
                            prefix="R$ "
                            delimiter=","
                            separator="."
                            precision={2}
                            backgroundColor="white"
                            fontSize={26}
                            width={200}
                        />
                        <Button onPress={ () => this.setState({ saved: this.state.total, showEdit: false }) }
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