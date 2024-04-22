import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { getToken, getUser, saveToken, saveUser } from '../storage/UserStorage'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { LoginStyles } from '../styles/LoginStyles';
import { NavigationContainer } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../styles/StandardStyles';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({navigation}:any) {

    const [email, setEmail] = useState('leonardo25@gmail.com');
    const [password, setPassword] = useState('1234567890');
    const [login,,,testApi,isLoading] = useContext(AuthContext);

    return (
        <View style={LoginStyles.container}>
            <Spinner visible={isLoading} />
        <View style={LoginStyles.wrapper} >
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
              onPress={() => {login(email,password);}}  >
                <Text style={[StandardStyles.simpleTextWhite, {fontWeight:"bold"}]}>INGRESAR</Text>

           </TouchableOpacity>


           <TouchableOpacity style={[StandardStyles.orangeSecondaryButton, {marginTop:10}]} 
              onPress={() => navigation.navigate("Register")}  >
                <Text style={[StandardStyles.simpleTextOrange, {fontWeight:"bold"}]}>REGISTRARME</Text>

           </TouchableOpacity>
           <TouchableOpacity style={[StandardStyles.orangePrimaryButton, {marginTop:10}]} 
              onPress={() => {testApi();}}  >
                <Text style={[StandardStyles.simpleTextWhite, {fontWeight:"bold"}]}>TEST</Text>

           </TouchableOpacity>

        </View>
        
        </View>

    )

}