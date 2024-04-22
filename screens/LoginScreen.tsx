import { Alert, Button, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

    const [email, setEmail] = useState('lburgos@equinorte.net');
    const [password, setPassword] = useState('12345678900');

    const navigation = useNavigation();
    

    const handleLogin = async () => {
        
        const body = JSON.stringify({
            email: email,
            password: password,
        });
        console.log(body);

        var saveToken = async (token: string) => {
            try {
                await AsyncStorage.setItem('token', token);
                console.log('Token guardado exitosamente');
            } catch (error) {
                console.error('Error al guardar el token:', error);
            }
        }

        const getData = async (key: string) => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (value !== null) {
                    return value;
                } else {
                    console.log('No hay datos almacenados para la clave', key);
                }
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

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
               
                navigation.navigate('Home');
               
            } else {
                Alert.alert('Error', data.message);
            }
            console.log("fin: ",navigation);
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión');
        }

        // Llamas a getData y esperas a que se resuelva la promesa
        getData("token").then((token) => {
            // Aquí puedes usar el token
            console.log("Token!!:", token);
        }).catch((error) => {
            // Manejar errores si la promesa se rechaza
            console.error('Error al obtener el token:', error);
        });
    }
    
    

    return (
        
        <View>
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
            <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
        
    )

}