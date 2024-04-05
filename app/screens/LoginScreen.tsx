import { Alert, Button, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getToken, getUser, saveToken, saveUser } from '../storage/UserStorage'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
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
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión');
        }

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