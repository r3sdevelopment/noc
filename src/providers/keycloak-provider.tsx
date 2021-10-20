import React, { useContext, useState, useEffect } from 'react';
import { Token } from "@r3s-dev/keycloak-js";

// Services
import { keycloak } from "../services/keycloak";

// Types
interface KeycloakContext {
    error: Error | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    token: Token | null;
}

const Context = React.createContext<KeycloakContext>({
    error: null,
    isLoggedIn: false,
    isAdmin: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    token: null
});

interface Props {}

const R3S_REFRESH_TOKEN = 'R3S_REFRESH_TOKEN';

const KeycloakProvider: React.FunctionComponent<Props> = ({children}) => {
    const [token, setToken] = useState<Token | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const isLoggedIn = !!token && token.isValid();
    const isAdmin: boolean = !!token?.hasRole("admin")

    const login = async (username: string, password: string) => {
        setError(null);
        try {
            const token = await keycloak.login({username, password});
            if (token.refreshToken) {
                sessionStorage.setItem(R3S_REFRESH_TOKEN, token.refreshToken)
            }
            setToken(token);
        } catch (error: any) {
            setError(error)
        }
    };

    const logout = async () => {
        setError(null);
        try {
            await keycloak.logout();
            setToken(null)
        } catch (error: any) {
            setError(error)
        }
    }

    useEffect(() => {
        try {
            const refreshToken = sessionStorage.getItem(R3S_REFRESH_TOKEN);
            if (refreshToken) {
               (async () => {
                   try {
                       const data = await keycloak.refreshToken(refreshToken)
                       const token = await keycloak.verifyToken(data.access_token);
                       if (token) {
                           setToken(token)
                       }
                   } catch (error) {
                       console.error(error)
                   }

               })()
            }
        } catch (error) {
            console.error('Unable to parse saved token')
        }

    },[])

    return (
        <Context.Provider value={{
            error,
            isLoggedIn,
            isAdmin,
            login,
            logout,
            token
        }}>
            {children}
        </Context.Provider>
    )
}

const useKeycloak = () => {
    return useContext(Context);
}

export {KeycloakProvider as default, useKeycloak}
