import React, { useState , NavigationEvents } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions,
        TouchableOpacity, Button, FlatList, ActivityIndicator,
        SafeAreaView, Animated, Image } from 'react-native';


import Carousel from 'react-native-snap-carousel';

//import { Swipeable } from 'react-native-gesture-handler';

import SideMenu from '../components/sideMenu.js';
import sidebutton from '../images/sidemenu.png'

const url = "http://192.168.0.182:3000/data";
const { width, height } = Dimensions.get("screen");


export default class HomeScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            group: [],
            contadores: [],
        }
        this.showSideMenu = false;
        this.positionX = new Animated.Value(0);
    }

    componentDidMount() {
        this.refresh();
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

    convertPrefix(prefix) {
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

    goBag(item) {
        var precision = this.getPrecision(item);
        this.positionX = new Animated.Value(0);
        this.setState({isLoading: true, showSideMenu: false});
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
            this.state.group = responseJson.banco;
            this.state.contadores = responseJson.contadores.map( function(item){
                const value = responseJson.banco.filter((bag) => {
                    if(item.bags.includes(bag.key)){

                        /*
                        * CONVERTER VALOR PARA O PREFIXO EM ITEM;
                        */

                        return bag.value;
                    }
                });
                return {
                    name: item.name,
                    prefix: item.prefix,
                    value: value.reduce((a, b) => parseFloat(a) + b.value, 0)
                };
            });
            //this.showSideMenu = false;
            //this.positionX = new Animated.Value(0);
            this.setState({ isLoading: false })
        }).catch((error) => {});
    }

    slide() {
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

    _renderItem = ({item, index}) => {
        return (
            <View style={{top: 25, alignItems: 'center', alignSelf: 'center'}}>

                <View style={{flexDirection: 'row', right: 10}}>
                    <View style={{justifyContent: 'flex-end', bottom: 6, right: 3}}>
                        <Text style={{color: 'white', fontSize: width/22}}>
                            {this.convertPrefix(item.prefix)}
                        </Text>
                    </View>

                    <View style={{justifyContent: 'flex-end'}}>
                        <Text style={{ color: 'white', fontSize: width/10}}>
                            {this.currencyFormat(item)}
                        </Text>
                    </View>
                </View>

                <View style={{bottom: 1}}>
                    <Text style={{ color: '#aaa', fontSize: width/35}}>
                        {item.name}
                    </Text>
                </View>

            </View>
        );
    }




    render(){
        return(

            <SafeAreaView style={[styles.container]}>

            <SideMenu
                refresh={this.refresh.bind(this)}
                navigation={this.props.navigation}
                style={{justifyContent: 'flex-start'}}/>



            {/* ----------- TELA ----------- */}
            <Animated.View style={[styles.screen, { transform: [{translateX: this.positionX}] }]}>     

                <StatusBar hidden={true}/>

                { this.state.isLoading ? <ActivityIndicator style={{position: 'absolute', top: 30}}/> :

                <View style={{width: '100%', alignItems: 'center', flex: 1}}>



                    {/* ----------- HEADER ----------- */}
                    <Animated.View style={[styles.header]}>

                        <TouchableOpacity
                            style={{position: 'absolute', left: 15, top: '15%'}}
                            onPress={() => this.slide()}>
                            <Image source={sidebutton} style={{height: 32, width: 32}}/>
                        </TouchableOpacity>

                        { this.state.contadores.length > 0 ?
                            <View style={{height: height*0.15,}}>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.contadores}
                                    renderItem={this._renderItem}
                                    sliderWidth={width*0.75}
                                    itemWidth={width*0.7}
                                />
                            </View>
                        :   <View style={{justifyContent: 'flex-end', bottom: 6, right: 3}}>
                                <Text style={{color: '#bbb', fontSize: width/22}}>
                                    Ainda não há contadores!
                                </Text>
                            </View>
                        }

                    </Animated.View>

                    <View style={{height: 10}}></View>



                    {/* ----------- LISTA ----------- */}
                    <FlatList
                        data={this.state.group}
                        style={{bottom: 10}}
                        renderItem={({ item }) => (

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => this.goBag(item)}
                            elevation={30}>
                            <View style={styles.row}>
                                <Text style={styles.textoBotao}> {item.name} </Text>
                                <Text style={[styles.textoBotao, {
                                    color: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'orange' : 'white'),
                                    fontWeight: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'bold' : 'normal'),
                                }]}>
                                {this.convertPrefix(item.prefix)} {this.currencyFormat(item)}
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
    container :{
        flex: 1,
        backgroundColor: '#404040',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 10,
    },
    header: {
        zIndex: 1,
        width: '100%',
        height: height*0.26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101010',
        elevation: 10,
        borderBottomRightRadius: 22,
        borderBottomLeftRadius: 22,
    },
    screen: {
        flexGrow: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: '#303030',
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
    textoBotao: {
        color: 'white',
        fontSize: width/22,
    },
    item: {
        fontSize: 16,
        backgroundColor: 'white'
    }
});