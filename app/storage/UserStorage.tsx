import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

const USER_KEY = '@user:key'

async function saveItem(key:string,data:string) {
    try {
        await AsyncStorage.setItem(key, data);
        console.log('Data guardada exitosamente');
        return data;
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return null;
    }
}

async function getItem(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            console.log('No hay datos almacenados para la clave', key);
            return null;
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return null;
    }
}

async function deleteItem(key:string) {
    try {
        await AsyncStorage.removeItem(key);
        const item = await AsyncStorage.getItem(key);
        return (item === null) ? "data eliminada del storage" : "Error al eliminar la data del storage";
    } catch (error) {
        console.log("Error al eliminar: ", error);
        return "Error";
    }
}

const getToken = async (key: string) => {
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


async function saveToken(key: string, token:string) {
    try {
        await AsyncStorage.setItem(key, token);
        console.log('Token guardado exitosamente');
        return token;
    } catch (error) {
        console.error('Error al guardar el token:', error);
        return null;
    }
}


export { deleteItem, getItem, saveItem, saveToken, getToken }