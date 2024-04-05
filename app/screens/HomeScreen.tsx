import {Text, TouchableOpacity, View} from 'react-native';

import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

//import createAppContainer from 'react-navigation';

const HomeScreen = () => {

    const navigation = useNavigation();
    
    return (
        <View>
        <Text style={
            {textAlign:"center", marginTop:200}
        }>Home Screen</Text>

        <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{
                backgroundColor: "purple",
                padding:10,
                marginTop: "20%",
                width:"50%",
                alignSelf:"center",
                borderRadius:10
            }}
        >

            <Text
                style={{
                    textAlign:"center",
                    color:"white"
                }}
            >
                Ir a perfil
            </Text>


        </TouchableOpacity>

        

      
        </View>
    )
}

export default HomeScreen;