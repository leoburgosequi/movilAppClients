import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { StandardStyles } from '../styles/StandardStyles';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

//import createAppContainer from 'react-navigation';

const HomeScreen = () => {

    const [, ,logout , , isLoading, user] = useContext(AuthContext);

    const navigation = useNavigation();

    return (
        <View>
            <Spinner visible={isLoading} />
            <Text style={{ textAlign: "center", marginTop: 200 }}>Hola, {user.name}</Text>

            <TouchableOpacity
                // onPress={() => navigation.navigate("Profile")}
                style={StandardStyles.orangeSecondaryButton}
            >

                <Text style={StandardStyles.simpleTextOrange}>
                    Ir a perfil
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => logout()}
                style={StandardStyles.orangePrimaryButton}
            >

                <Text style={StandardStyles.simpleTextWhite}>
                    Salir
                </Text>
            </TouchableOpacity>




        </View>
    )
}

export default HomeScreen;