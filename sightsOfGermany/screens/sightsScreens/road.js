import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

const Road = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../accets/bgr.jpeg')}
                style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'gold' }}>Road</Text>

                    <TouchableOpacity
                        style={{position: 'absolute',bottom: 10,right: 10, width: 50, height: 40, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: 'gold', justifyContent: 'center' }}
                        onPress={() => { navigation.navigate('HomeScreen') }}
                    >
                        <Ionicons name='home' style={{color: 'gold', fontSize: 30}} />
                    </TouchableOpacity>
                </View>
                
            </ImageBackground>
            
        </View>
    );
};

export default Road;