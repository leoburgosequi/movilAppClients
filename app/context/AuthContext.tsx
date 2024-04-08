import React, { createContext, useState } from "react";
import { deleteItem, getItem, saveItem } from "../storage/UserStorage";

import { BASE_URI } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {

    const [isLoading, setIsLoading] = useState(false);

    const login = (email: string, password: string) => {
        axios.post(`${BASE_URI}/login`, {
            email, password
        }).then(res => {
            console.log(res.data.user);
            saveItem('user:data', JSON.stringify(res.data.user));
            saveItem('user:token', res.data.access_token);
        }).catch(error => {
            console.log(`Login error ${error}`);
        });
    }

    const logout = () => {

        const token = getItem('user:token').then(res => {
            console.log("token: ", res);
            if (res !== null) {
                axios.post(`${BASE_URI}/logout`, {}, {
                    headers: {
                        'Authorization': `Bearer ${res}`
                    }
                }).then(res => {
                    console.log(res.data);
                    deleteItem('user:token').then(resp => {
                        console.log(resp)
                    })
                }).catch(e => console.log("Error al realizar petición. ",e));
            }
        }).catch(error => {
            console.log("Error al obtener data", error);
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

            let data = res.data;
            console.log("res",data.user);
        }

        ).catch(e => {
            console.log(`Error register ${e}`)
        });

    };

    return (
        <AuthContext.Provider value={[login, register, logout]} >
            {children}
        </AuthContext.Provider>
    );
};