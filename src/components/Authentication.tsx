import React, { useState } from 'react';
import { Token } from "@r3s-dev/keycloak-js";

// Services
import { keycloak } from "../services/keycloak";

// Styles
import styles from './Authentication.module.scss';

const Authentication = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<Token | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const isLoggedIn = !!token;

    const reset = () => {
        setError(null)
        setUsername('');
        setPassword('')
    }

    const handleLogin = async () => {
        if (!username || !password) {
            return;
        }

        try {
            const result = await keycloak.login({username, password});
            setToken(result);
            reset()
        } catch (error) {
            if (error instanceof Error) {
                setError(error)
            }
        }
    };

    const handleLogout = async () => {
        try {
            await keycloak.logout();
            setToken(null)
        } catch (error) {
            if (error instanceof Error) {
                setError(error)
            }
        }
    }

    const getTokenDetails = (token: Token) => {
        return {
            isValid: token?.isValid(),
            isAdmin: token?.hasRole("admin"),
            isUser: token?.hasRole("user")
        }
    }

    return (
        <div className={styles.authentication}>
            {
                isLoggedIn
                    ?
                    <button onClick={handleLogout}>logout</button>
                    :
                    <React.Fragment>
                        <input type="text" autoComplete="username" onChange={e => setUsername(e.target.value)} placeholder="username" value={username}/>
                        <input type="password" autoComplete="current-password" placeholder="password" onChange={e => setPassword(e.target.value)}
                               value={password}/>
                        <button onClick={handleLogin}>login</button>
                    </React.Fragment>
            }
            {
                isLoggedIn && (
                    <div className={styles.authentication}>
                        <h3>Token</h3>
                        <code>
                            <pre>
                                {JSON.stringify(getTokenDetails(token), undefined, 2)}
                            </pre>
                        </code>
                    </div>
                )
            }
            {
                !!error && (
                    <div className={styles.authentication}>
                        <h3>Error</h3>
                        <code>
                            <pre style={{color: 'red'}}>
                                {
                                    // @ts-ignore
                                    JSON.stringify(error.response.data)
                                }
                            </pre>
                        </code>
                    </div>
                )
            }
        </div>
    )
}

export default Authentication
