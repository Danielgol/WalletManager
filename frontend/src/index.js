import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login.js';
import HomeScreen from './pages/homeScreen.js';
import CreateBag from './pages/createBag.js';
import History from './pages/history.js';
import Bag from './pages/bag.js';

const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer theme={{ colors: { background: '#303030' }}}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="Bag" component={Bag}/>
                <Stack.Screen name="History" component={History}/>
                <Stack.Screen name="CreateBag" component={CreateBag}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
