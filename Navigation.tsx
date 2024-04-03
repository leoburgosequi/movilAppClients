import HomeScreen from "./screens/HomeScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "./screens/ProfileScreen";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

function FooterOptions() {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#ffffff"
        inactiveColor="#ff976b"
        barStyle={{ backgroundColor: '#e45417',borderTopLeftRadius: 30,overflow: 'hidden',borderTopRightRadius: 30, height:88 }}
      >
            <Tab.Screen 
                name="Home"    
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inicio',
                   
                }}
                />
            <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
    )
}

export default function Navigation() {
return (
    <NavigationContainer>
        <FooterOptions />
    </NavigationContainer>
)
}


