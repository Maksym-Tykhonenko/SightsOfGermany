import React, { useState, useEffect } from 'react';
import { View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Prodact from './routs/Prodact';
import HomeScreen from './screens/HomeScreen';
import ArchitecturalLandmark from './screens/sightsScreens/architecturalLandmark';
import NaturalAttraction from './screens/sightsScreens/naturalAttraction';
import Opera from './screens/sightsScreens/opera';
import Casino from './screens/sightsScreens/casino';
import ShoppingCenter from './screens/sightsScreens/shoppingCenter';
import Road from './screens/sightsScreens/road';
import Circus from './screens/sightsScreens/circus';
import Theater from './screens/sightsScreens/theater';
import Nightclub from './screens/sightsScreens/nightclub';
import Museum from './screens/sightsScreens/museum';
import Details from './screens/sightsScreens/Details';
import NewDetails from './screens/sightsScreens/NewDetails';
import MyProfile from './screens/MyProfile';





const App = () => {

    const [route, setRoute] = useState(false);

    const Route = ({ isFatch }) => {
        
        if (isFatch) {
            return (
                <Stack.Navigator>
                    <Stack.Screen name="Prodact" component={Prodact} />
                </Stack.Navigator>
            )
        } return (
            <Stack.Navigator >
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="ArchitecturalLandmark" component={ArchitecturalLandmark} />
                <Stack.Screen options={{ headerShown: false }} name="NaturalAttraction" component={NaturalAttraction} />
                <Stack.Screen options={{ headerShown: false }} name="Opera" component={Opera} />
                <Stack.Screen options={{ headerShown: false }} name="Casino" component={Casino} />
                <Stack.Screen options={{ headerShown: false }} name="ShoppingCenter" component={ShoppingCenter} />
                <Stack.Screen options={{ headerShown: false }} name="Road" component={Road} />
                <Stack.Screen options={{ headerShown: false }} name="Circus" component={Circus} />
                <Stack.Screen options={{ headerShown: false }} name="Theater" component={Theater} />
                <Stack.Screen options={{ headerShown: false }} name="Nightclub" component={Nightclub} />
                <Stack.Screen options={{ headerShown: false }} name="Museum" component={Museum} />
                <Stack.Screen options={{ headerShown: false }} name="Details" component={Details} />
                <Stack.Screen options={{ headerShown: false }} name="NewDetails" component={NewDetails} />
                <Stack.Screen options={{ headerShown: false }} name="MyProfile" component={MyProfile} />

            </Stack.Navigator>
        );
    };
    
  
    return (
        <NavigationContainer>
            <Route isFatch={route} />
        </NavigationContainer>
        
    );
};

export default App;