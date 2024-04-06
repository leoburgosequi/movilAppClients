import React, { createContext, useState } from "react";

import { BASE_URI } from "../config";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }:any) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState('EL feo ');

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
        <AuthContext.Provider value={register}>
            {children}
        </AuthContext.Provider>
    );
};