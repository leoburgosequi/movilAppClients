import React, { createContext, useEffect, useState } from "react";
import { deleteItem, getItem, saveItem } from "../storage/UserStorage";

import { Alert } from "react-native";
import { BASE_URI } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user,setUser] = useState({});
    const [token, setToken] = useState('');
    const  [ splashLoading, setSplashLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        axios.post(`${BASE_URI}/login`, {
            email, password
        }).then(async res => {
            console.log(res.data.user);
            if(res.data.user === null){
                Alert.alert(res.data.message, '', [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                  setIsLoading(false);
                  return;
            }
            
            await saveItem('user:data', JSON.stringify(res.data.user));
            await saveItem('user:token', res.data.access_token);
            setUser(res.data.user);
            setToken(res.data.access_token);
            console.log(res.data.message);
            setIsLoading(false);
        }).catch(error => {
            console.log(`Login error ${error}`);
            setIsLoading(false);
        });
    }

    const testApi = () => {
        console.log("testApi");
        setIsLoading(true);
        axios.get(`${BASE_URI}/testApi`).then(res => {
            Alert.alert(res.data.nombre, '', [
                {
                  text: 'Cerrar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ]);
              setIsLoading(false);
              return;
        }).catch(e => {
            setIsLoading(false);
            console.log("test api error: ", e);
        })
    }

    const logout = async () => {
        setIsLoading(true);
        const token = await getItem('user:token').then(res => {
            console.log("token: ", res);
            if (res !== null) {
                axios.post(`${BASE_URI}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${res}`
                    }
                }).then(async res => {
                    console.log(res.data);
                    await deleteItem('user:token');
                    await deleteItem('user:data');
                    setUser({});
                    setToken('');
                    setIsLoading(false);
                }).catch(e => {
                    console.log("Error al realizar petición. ",e);
                    setIsLoading(false);
            });
            }
        }).catch(error => {
            console.log("Error al obtener data", error);
            setIsLoading(false);
        })
    }

    const register = (name: string, email: string, password: string, passwordConfirmation: string) => {
        setIsLoading(true);
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        console.log("data", data);

        axios.post(`${BASE_URI}/register`, data).then(res => {
            console.log(res.data.message);
            const {email,password} = res.data.message;
            console.log(email,password)
            if(res.data.user === null){
                Alert.alert("Error al registrar usuario", (email !== undefined) ? "* Este Correo ya existe": '' + "\n" + (password !== undefined) ? "* Las contraseñas no coinciden":'' , [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                  setIsLoading(false);
                  return;
            }else{

                Alert.alert("Usuario creado exitosamente", '' , [
                    {
                      text: 'Cerrar',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);

                console.log("res",res.data);
                setUser(res.data.user);
                setIsLoading(false);
            }
            
        }).catch(e => {
            console.log(`Error register ${e}`);
            setIsLoading(false);
        });

    };

    
        // Definir una función asincrónica dentro de un efecto
        const isLoggedIn = async () => {
          try {
            // Obtener el valor del AsyncStorage
            setSplashLoading(true);
            const value = await getItem('user:data');
    
            // Actualizar el estado solo si se obtiene un valor válido
            if (value !== null) {
              setUser(JSON.parse(value));
            }
            setSplashLoading(false);
          } catch (error) {
            console.error('Error al obtener datos:', error);
            setSplashLoading(false);
          }
        };
        useEffect(() => {
        // Llamar a la función asincrónica definida
        isLoggedIn();
      }, []);

    return (
        <AuthContext.Provider value={[login, register, logout, testApi, isLoading, user,token,splashLoading,isLoggedIn]} >
            {children}
        </AuthContext.Provider>
    );
};

function res(value: string | undefined): string | PromiseLike<string | undefined> | undefined {
    throw new Error("Function not implemented.");
}
