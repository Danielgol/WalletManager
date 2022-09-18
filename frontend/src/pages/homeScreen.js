import React, { useState , NavigationEvents } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions,
        TouchableOpacity, Button, FlatList, ActivityIndicator,
        SafeAreaView, Animated, Image, BackHandler } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';

import TokenManager from './tokenManager';

//import { Swipeable } from 'react-native-gesture-handler';

import SideMenu from '../components/sideMenu.js';
import sidebutton from '../images/sidemenu-verde.png'

const { width, height } = Dimensions.get("screen");



export default class HomeScreen extends React.Component{

    //_isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: '',
            maletas: [],
            grupos: [],
        }
        this.showSideMenu = false;
        this.positionX = new Animated.Value(0);
    }

    componentDidMount() {
        this.refresh();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    
    componentWillUnmount() {
        //this._isMounted = false;
        // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
        this.setState = (state, callback)=>{
            return;
        };
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            BackHandler.exitApp()
            return true
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
    }

    abrirMaleta(item) {
        var precision = this.getPrecision(item);         
        this.positionX = new Animated.Value(0);         
        this.setState({isLoading: true, showSideMenu: false});
        this.props.navigation.navigate('Maleta', {
            _id: item._id,
            name: item.name,
            value: item.value,
            prefix: item.prefix,
            precision: precision,
            refresh: this.refresh.bind(this)
        });
    }

    abrirGrupo(item) {
        var precision = this.getPrecision(item);         
        this.positionX = new Animated.Value(0);         
        this.setState({isLoading: true, showSideMenu: false});
        this.props.navigation.navigate('Grupo', {
            _id: item._id,
            name: item.name,
            value: item.value,
            prefix: item.prefix,
            precision: precision,
            refresh: this.refresh.bind(this)
        });
    }

    async getUserInfo(token){
        return await fetch("https://fintrack-express.herokuapp.com/getUserInfo", { 
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
            return responseJson.name;
        }).catch((error) => {
            return null;
        });
    }

    async getMaletas(token){
        return await fetch("https://fintrack-express.herokuapp.com/getMaletas", { 
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
    }

    async getGrupos(token){
        return await fetch("https://fintrack-express.herokuapp.com/getGrupos", { 
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
            return responseJson.map( function(item) {
                /*
                const value = responseJson.banco.filter((bag) => {
                    if(item.bags.includes(bag.key)){
                        //CONVERTER VALOR PARA O PREFIXO EM ITEM;
                        return bag.value;
                    }
                });
                */
                return {
                    _id: item._id,
                    name: item.name,
                    prefix: item.prefix,
                    value: 0
                    //value: value.reduce((a, b) => parseFloat(a) + parseFloat(b.value), 0)
                };
            });
        }).catch((error) => {
            return null;
        });
    }

    async refresh() {
        this.positionX = new Animated.Value(0);
        this.setState({isLoading: true, showSideMenu: false});

        try{
            const token = await TokenManager.getToken();
            if(!token){
                this.props.navigation.navigate('Login')
            }

            this.state.name = await this.getUserInfo(token)
            if (!this.state.name) {
                alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }

            this.state.maletas = await this.getMaletas(token)
            if (!this.state.maletas) {
                alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }

            this.state.grupos = await this.getGrupos(token)
            if (!this.state.grupos) {
                alert("Sessão Encerrada!");
                this.props.navigation.navigate('Login');
                return;
            }
            
            this.setState({ isLoading: false })
        }catch(error){}
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

    _renderGrupoButton = ({item, index}) => {
        return (
            <TouchableOpacity style={{top: 25}} onPress={() => this.abrirGrupo(item)}>
                <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-end'}}>
                            <Text style={{ color: '#AEE637', fontSize: width/10}}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }



    render(){
        return(

            <SafeAreaView style={[styles.container]}>

            <SideMenu
                maletas={this.state.maletas}
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

                        <View>
                            <Text style={{color: '#bbb', fontSize: width/22}}>
                                {this.state.name}
                            </Text>
                        </View>

                        { this.state.grupos.length > 0 ?
                            <View style={{height: height*0.15,}}>
                                <Carousel
                                    ref={(c) => { this._carousel = c; }}
                                    data={this.state.grupos}
                                    renderItem={this._renderGrupoButton}
                                    sliderWidth={width*0.75}
                                    itemWidth={width*0.7}
                                />
                            </View>
                        :   <View style={{justifyContent: 'flex-end', bottom: 6, right: 3}}>
                                <Text style={{color: '#AEE637', fontSize: width/22, marginTop: 15}}>
                                    Ainda não há grupos!
                                </Text>
                            </View>
                        }

                        <View style={{bottom: 1,  alignItems: 'center'}}>
                            <Text style={{ color: '#aaa', fontSize: width/35}}>
                                Grupos
                            </Text>
                        </View>
                    </Animated.View>

                    <View style={{height: 10}}></View>

                    {/* ----------- LISTA ----------- */}
                    <FlatList
                        data={this.state.maletas}
                        style={{bottom: 10}}
                        renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={() => this.abrirMaleta(item)}
                            elevation={30}>
                            <View style={styles.row}>
                                <Text style={[styles.textoBotao, {color: '#AEE637'}]}> {item.name} </Text>
                                <Text style={[styles.textoBotao, {
                                    color: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? '#BFF111' : '#AEE637'),
                                    fontWeight: ((item.prefix == 'BTC' || item.prefix == 'ETH') ? 'bold' : 'normal'),
                                }]}>
                                {this.convertPrefix(item.prefix)} {this.currencyFormat(item)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
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