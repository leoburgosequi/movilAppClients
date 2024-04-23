import { Alert, Button, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { getToken, getUser, saveToken, saveUser } from '../storage/UserStorage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import LoginBackground from '../resources/LoginBackground.png';
import { LoginStyles } from '../styles/LoginStyles';
import LoginUserIcon from '../resources/LoginUserIcon.png';
import { NavigationContainer } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../styles/StandardStyles';
import WhiteLogo from '../resources/WhiteLogo.png';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({ navigation }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, , , testApi, isLoading] = useContext(AuthContext);

    return (
        <View style={LoginStyles.container} >
            <ImageBackground
                source={LoginBackground}
                resizeMode="cover"
                style={LoginStyles.imgBackground}
            >
                <Image
                    source={WhiteLogo}
                    style={{ position: "absolute", top: 50 }}
                />
                <Spinner visible={isLoading} />

                {/* <KeyboardAvoidingView
                style={LoginStyles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
               // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
    > */}
                <View style={LoginStyles.wrapper} >

                    <View style={LoginStyles.userIcon}>
                        <Image
                            source={LoginUserIcon}
                            style={LoginStyles.loginUserIcon}
                        />
                    </View>

                    <Text style={LoginStyles.titleMessage}>
                        ¡Bienvenido!
                    </Text>
                    <TextInput
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        style={[LoginStyles.textInput, StandardStyles.simpleTextOrange]}
                    />
                    <TextInput
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={LoginStyles.textInput}
                    />
                    <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 30, width: "80%" }]}
                        onPress={() => { login(email, password); }}  >
                        <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>INGRESAR</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[StandardStyles.orangeSecondaryButton, { marginTop: 10, width: "80%" }]}
                        onPress={() => navigation.navigate("Register")}  >
                        <Text style={[StandardStyles.simpleTextOrange, { fontWeight: "bold" }]}>REGISTRARME</Text>

                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[StandardStyles.orangePrimaryButton, { marginTop: 10, width:"80%" }]}
                        onPress={() => { testApi(); }}  >
                        <Text style={[StandardStyles.simpleTextWhite, { fontWeight: "bold" }]}>TEST</Text>

                    </TouchableOpacity> */}
                </View>
                {/* </KeyboardAvoidingView> */}
            </ImageBackground>
        </View>
    )

}