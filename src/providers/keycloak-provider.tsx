import React from 'react';

const KeycloakContext = React.createContext(null);

interface Props {}

const KeycloakProvider: React.FunctionComponent<Props> = ({children}) => {
    const value = null
    return (
        <KeycloakContext.Provider value={value}>
            {children}
        </KeycloakContext.Provider>
    )
}

export {KeycloakProvider}
