import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/ProfileScreen";
import React from "react";
import RegisterScreen from "../screens/RegisterScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStackNavigator = createNativeStackNavigator();



function MyStack() {
    return (

        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


function FooterOptions() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#ffffff"
            inactiveColor="#ff976b"
            barStyle={{ backgroundColor: '#e45417', borderTopLeftRadius: 30, overflow: 'hidden', borderTopRightRadius: 30, height: 88 }}
        >
            <Tab.Screen
                name="Home"
                component={MyStack}
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
        <MyStack />
        //<><FooterOptions /><MyStack /></>

    )
}


