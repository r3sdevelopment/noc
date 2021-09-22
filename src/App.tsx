import React from 'react';
import keycloak from './service/keycloak';

const App = () => {
    const handleLogin = async () => {
        const jwt = await keycloak.login({ username: 'user1', password: 'test' });
        console.log(keycloak.token);
        keycloak.token.verify(jwt.access_token)
    };
    return (
        <div>
            <h1>noc.r3s.dev</h1>
            <button onClick={handleLogin} type="button">login</button>
        </div>
    );
};

export default App;
