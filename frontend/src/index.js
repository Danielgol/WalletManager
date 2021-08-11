import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './pages/Login.js';
import HomeScreen from './pages/HomeScreen.js';
import Bag from './pages/Bag.js';

export default function App(){
    return(
        <NavigationContainer theme={{ colors: { background: '#303030' }}}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="Bag" component={Bag}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
