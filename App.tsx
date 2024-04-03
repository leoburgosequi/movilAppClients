import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('lburgos@equinorte.net');
  const [password, setPassword] = useState('1234567890');

  const handleLogin = async () => {
    const body = JSON.stringify({
      email: email,
      password: password,
    });
    console.log(body);

    var saveToken = async (token: string) => {
      try {
        await AsyncStorage.setItem('token',token);
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
        console.log("resp: ",data.access_token);
        saveToken(data.access_token);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al intentar iniciar sesión');
    }

    console.log("EEE",getData("token"));
  

   


    const aboutMe = async () => {
      
      // try {
      //   const respUser = await fetch('http://127.0.0.1:8000/api/aboutMe', {
      //     method:'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${token}`,
      //     }
      //   })
      // } catch (error) {
        
      // }
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
    
  );
};

export default LoginScreen;
