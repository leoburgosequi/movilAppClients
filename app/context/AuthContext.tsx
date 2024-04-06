import React, { createContext, useState } from "react";

import { BASE_URI } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }:any) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState('EL feito ');
    const [other, setother] = useState('EL feito 2.0 ');

    const login = () => {
        setUserToken('gjksdgjksd');
        setIsLoading(false);
        return "ok";
    }

    const logout = () => {
        setUserToken('');
        setIsLoading(false);
        return "ok";
    }

    const register = (name: string, email: string, password: string, passwordConfirmation: string) => {
        const data = {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        }
        console.log(data);

        axios.post(`${BASE_URI}/register`, data).then(res => {
           
            let user = res.data;
            console.log(user);
        }

        ).catch(e => {
            console.log(`Error register ${e}`)
        });

    };


    return (
        <AuthContext.Provider value={[userToken, other,register]} >
            {children}
        </AuthContext.Provider>
    );
};