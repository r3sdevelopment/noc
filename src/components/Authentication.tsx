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

    return (
        <div className={styles.authentication}>
            <input type="text" autoComplete="username" onChange={e => setUsername(e.target.value)} value={username}/>
            <input type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)}
                   value={password}/>
            {
                !!token
                    ?
                    <button onClick={handleLogout}>logout</button>
                    :
                    <button onClick={handleLogin}>login</button>
            }
            {
                !!token && (
                    <div className={styles.authentication}>
                        <h3>Token</h3>
                        <code>
                            <pre>
                                {JSON.stringify(token.value, undefined, 2)}
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
