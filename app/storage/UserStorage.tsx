import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";

const USER_KEY = '@user:key'

async function saveUser(user: any) {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('Usuario guardado exitosamente');
        return JSON.stringify(user);
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        return null;
    }
}

async function saveToken(token: string) {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('Token guardado exitosamente');
        return token;
    } catch (error) {
        console.error('Error al guardar el token:', error);
        return null;
    }
}

async function getUser(key: string | null) {
    try {
        const value = await AsyncStorage.getItem(key === null ? USER_KEY : key);
        if (value !== null) {
            return JSON.parse(value);
        } else {
            console.log('No hay datos almacenados para la clave', USER_KEY);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return null;
    }
}

async function deleteUser() {
    try {
        await AsyncStorage.removeItem(USER_KEY);
        const item = await AsyncStorage.getItem(USER_KEY);
        return (item === null) ? "Usuario eliminado del storage" : "Error al eliminar usuario del storage";
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

export { deleteUser, getUser, saveUser, saveToken, getToken }