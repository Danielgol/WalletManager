import React, { useState , NavigationEvents } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions,
        TouchableOpacity, Button, FlatList, ActivityIndicator,
        SafeAreaView, Animated, Image } from 'react-native'

import SideMenu from '../components/sideMenu.js';

import sidebutton from '../images/sidemenu.png'

const url = "http://192.168.0.182:3000/data";
const { width, height } = Dimensions.get("screen");


export default class HomeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            group: [],
            total: 0,
        }
        this.showSideMenu = false;
        this.positionX = new Animated.Value(0);
    }

    componentDidMount(){
        this.refresh();
    }

    getPrecision(item){
        var precision = 2;
        if(item.prefix === 'BTC' || item.prefix === 'ETH'){
            precision = 8;
        }
        return precision;
    }

    goMoney(item){
        var precision = this.getPrecision(item);
        this.setState({isLoading: true});
        this.props.navigation.navigate('Bag', {
            key: item.key,
            name: item.name,
            value: item.value,
            prefix: item.prefix,
            precision: precision,
            refresh: this.refresh.bind(this)
        });
    }

    refresh() {
        fetch(url).then(response => response.json()).then((responseJson) => {
            this.state.group = responseJson;
            this.state.total = responseJson.reduce(
                (total, object) => parseFloat(total) + parseFloat(Object.values(object)[1]),0);
            this.setState({ isLoading: false })
        }).catch((error) => {});
    }

    slide(){
        /*
        Animated.timing(this.scaleValue, {
            toValue: this.showSideMenu ? 1 : 0.80,
            duration: 300,
            useNativeDriver: true
        }).start()
        */

        Animated.timing(this.positionX, {
            toValue: this.showSideMenu ? 0 : width*0.60,
            duration: 300,
            useNativeDriver: true
        }).start()

        this.showSideMenu = !this.showSideMenu;
    }



    render(){
        return(

            <SafeAreaView style={[styles.container]}>

            <SideMenu style={{justifyContent: 'flex-start'}}/>

            {/* ----------- TELA ----------- */}
            <Animated.View style={[styles.screen, { alignItems: 'center', backgroundColor: '#303030',
                transform: [{translateX: this.positionX}] }]}>

                <StatusBar hidden={true}/>

                { this.state.isLoading ? <ActivityIndicator style={{position: 'absolute', top: 30}}/> :

                <View style={{width: '100%', alignItems: 'center'}}>

                    {/* ----------- HEADER ----------- */}
                    <View style={{
                        width: '100%',
                        height: '26%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#404040',
                        elevation: 10,
                        }}>
                        <TouchableOpacity
                            style={{position: 'absolute', left: 20, top: '20%'}}
                            onPress={() => this.slide()}>
                            <Image source={sidebutton} style={{height: 32, width: 32}}/>
                        </TouchableOpacity>

                        <Text style={{color: 'white', fontSize: width/18}}>
                            R$ {parseFloat(this.state.total).toFixed(2)}
                        </Text>
                    </View>

                    {/* ----------- LISTA ----------- */}
                    <FlatList
                        data={this.state.group}
                        style={{bottom: 10, top: 20}}
                        renderItem={({ item }) => (

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => this.goMoney(item)}
                            elevation={30}>
                            <View style={styles.row}>
                                <Text style={styles.textoBotao}> {item.name} </Text>
                                <Text style={[styles.textoBotao, {
                                    color: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'orange' : 'white'),
                                    fontWeight: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'bold' : 'normal'),
                                }]}>
                                {item.prefix} {parseFloat(item.value).toFixed(this.getPrecision(item))}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        )}
                    />
                </View> }

            </Animated.View>

            </SafeAreaView>
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
    container :{
        flex: 1,
        backgroundColor: '#494949',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 10,
    },
    screen: {
        flexGrow: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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
    textoBotao: {
        color: 'white',
        fontSize: width/22,
    },
    item: {
        fontSize: 16,
        backgroundColor: 'white'
    }
});