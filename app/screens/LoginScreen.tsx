import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { getToken, getUser, saveToken, saveUser } from '../storage/UserStorage'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { LoginStyles } from '../styles/LoginStyles';
import { NavigationContainer } from '@react-navigation/native';
import { StandardStyles } from '../styles/StandardStyles';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('lburgos@equinorte.net');
    const [password, setPassword] = useState('12345678900');

   const [userToken, other] = useContext(AuthContext);

    const handleLogin = async () => {

        const body = JSON.stringify({
            email: email,
            password: password,
        });
        console.log(body);

        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const data = await response.json();
            if (response.ok) {
                console.log("resp: ", data.access_token);
                saveToken(data.access_token);
              //  navigation.navigate('Home');

            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión');
        }

    }

    return (
        <View style={LoginStyles.container}>
        <View style={LoginStyles.wrapper} >
            <Text>{userToken}</Text>
            <Text>{other}</Text>
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />


           <TouchableOpacity style={[StandardStyles.orangePrimaryButton, {marginTop:10}]} 
              onPress={handleLogin}  >
                <Text style={[StandardStyles.simpleTextWhite, {fontWeight:"bold"}]}>INGRESAR</Text>

           </TouchableOpacity>
           <TouchableOpacity style={[StandardStyles.orangeSecondaryButton, {marginTop:10}]} 
              onPress={() => navigation.navigate("Register")}  >
                <Text style={[StandardStyles.simpleTextOrange, {fontWeight:"bold"}]}>REGISTRARME</Text>

           </TouchableOpacity>
        </View>
        
        </View>

    )

}