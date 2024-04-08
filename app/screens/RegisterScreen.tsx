import React, { useContext, useState } from "react";
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { LoginStyles } from "../styles/LoginStyles";
import { StandardStyles } from "../styles/StandardStyles";

const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState('leonardo25@gmail.com');
    const [password, setPassword] = useState('1234567890');
    const [name, setName] = useState('leonardo');
    const [passwordConfirmation, setPasswordConfirmation] = useState('1234567890');

    const [register] = useContext(AuthContext);
    console.log(register);

    return (
        <View style={LoginStyles.container}>
        <View style={LoginStyles.wrapper} >
        <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            
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
            <TextInput
                placeholder="Confirmar contraseña"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry
            />

           <TouchableOpacity style={[StandardStyles.orangePrimaryButton, {marginTop:10}]} 
              onPress={() => {register(name,email,password,passwordConfirmation);}} >
                <Text style={[StandardStyles.simpleTextWhite, {fontWeight:"bold"}]}>CREAR CUENTA</Text>

           </TouchableOpacity>
        </View>
        
        </View>
    )
}

export default RegisterScreen;