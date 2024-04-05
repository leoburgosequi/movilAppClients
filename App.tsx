import { Alert, Button, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Navigation from './Navigation';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/ProfileScreen';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
   // Ocultar la pantalla de bienvenida después de un cierto tiempo
    setTimeout(() => {
      setShowSplash(true);
    }, 2000); // Por ejemplo, ocultar después de 2 segundos
  }, []);

  if (!showSplash) {
    return null; // Muestra el splash screen mientras la aplicación se carga
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}options={{
                    headerShown:false
                }} /> 
        
      </Stack.Navigator>
      
    </NavigationContainer>
    
   );
}


