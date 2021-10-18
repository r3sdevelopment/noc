import React, { useContext, useState } from 'react';
import { Token } from "@r3s-dev/keycloak-js";

// Services
import { keycloak } from "../services/keycloak";

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

const KeycloakProvider: React.FunctionComponent<Props> = ({children}) => {
    const [token, setToken] = useState<Token | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const isLoggedIn = !!token && token.isValid();

    const login = async (username: string, password: string) => {
        setError(null);
        try {
            const result = await keycloak.login({username, password});
            setToken(result);
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

    const isAdmin: boolean = !!token?.hasRole("admin")

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
