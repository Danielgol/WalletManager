import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login/login.js';
import HomeScreen from './pages/homeScreen.js';
import CreateGrupo from './pages/createGrupo.js';
import CreateMaleta from './pages/createMaleta.js';
import History from './pages/history.js';
import Maleta from './pages/maleta.js';
import Register from './pages/register.js';
import SobreNos from './pages/sobreNos.js';
import Grupo from './pages/grupo.js';

const Stack = createStackNavigator();

export default function App(){
    return(
        <NavigationContainer theme={{ colors: { background: '#303030' }}}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen name="Maleta" component={Maleta}/>
                <Stack.Screen name="Grupo" component={Grupo}/>
                <Stack.Screen name="History" component={History}/>
                <Stack.Screen name="CreateMaleta" component={CreateMaleta}/>
                <Stack.Screen name="CreateGrupo" component={CreateGrupo}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="SobreNos" component={SobreNos}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
