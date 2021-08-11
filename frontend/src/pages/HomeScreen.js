import React, { useState , NavigationEvents } from 'react'
import { View, Text, StyleSheet, StatusBar,
        TouchableOpacity, Button, FlatList, ActivityIndicator} from 'react-native'

const url = "http://192.168.0.182:3000/data";

export default class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            maleta: [],
            total: 0
        }
    }

    componentDidMount(){
        this.refresh();
    }

    getPrecision(item){
        var precision = 2;

        if(item.prefix === 'BTC'){
            precision = 8;
        }

        return precision;
    }

    goMoney(item){

        var precision = this.getPrecision(item);

        this.setState({isLoading: true});
        this.props.navigation.navigate('Money', { 
            name: item.name,
            value: item.value,
            prefix: item.prefix,
            precision: precision,
            refresh: this.refresh.bind(this)
        });
    }

    refresh() {
        fetch(url).then(response => response.json()).then((responseJson) => {
            this.state.maleta = responseJson;
            this.state.total = responseJson.reduce((total, object) => total + Object.values(object)[1],0);
            this.setState({ isLoading: false })
        }).catch((error) => {});
    }

    render(){
        return(

            <View style={styles.screen}>

                <StatusBar hidden={true}/>

                {this.state.isLoading ? <ActivityIndicator style={{position: 'absolute', top: 30}}/> : 
                    <View>
                        <View style={{height: '30%', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.textoBotao}>R$ {this.state.total.toFixed(2)} </Text>
                        </View>

                        <FlatList data={this.state.maleta}
                            style={{padding: 2}}
                            renderItem={({ item }) => (

                            <TouchableOpacity
                                style={styles.botao}
                                onPress={() => this.goMoney(item) }
                                elevation={30}>
                                <View style={styles.row}>
                                    <Text style={styles.textoBotao}> {item.name} </Text>
                                    <Text style={styles.textoBotao}>
                                        {item.prefix} {item.value.toFixed(this.getPrecision(item))}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            )}
                        />
                    </View>
                }

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
        backgroundColor: '#404040',
        alignItems: 'center'
    },
    container: {
        //position: 'relative',
        //top: '50%',
        backgroundColor: '#404040',
        alignItems: 'center'
    },
    botao: {
        width: 350,
        height: 70,
        marginTop: 20,
        backgroundColor: '#505050',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    textoBotao: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    item: {
        fontSize: 16,
        backgroundColor: 'white'
    }
});