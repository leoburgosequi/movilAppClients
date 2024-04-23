import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import React from "react";

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 10,
        height: "60%",
        zIndex: 1,
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
        alignItems:"center",
        justifyContent: "center",
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    loginUserIcon: {


    },
    userIcon: {
     //   position: "absolute",
        width: 108,
        height: 108,
       // top: 170,
        zIndex: 2,
        backgroundColor: "white",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 6,
            height: 6,
        },
        elevation: 10,
    },
    titleMessage:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:10
    },
    textInput:{
        borderBottomWidth:1,
        borderBottomColor:"gray",
        width:"90%"
        
    }
});


export { LoginStyles }