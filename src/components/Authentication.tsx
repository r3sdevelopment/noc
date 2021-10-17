import React, { useState } from 'react';
import classNames from 'classnames';
import { Token } from "@r3s-dev/keycloak-js";

// Components
import Error from './Error';

// Services
import { keycloak } from "../services/keycloak";

// Styles
import styles from './Authentication.module.scss';

interface Props extends React.ComponentProps<'div'> {}

const Authentication: React.FunctionComponent<Props> = ({className, ...props}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<Token | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const classes = classNames(styles.root, className);

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
        } catch (error: any) {
            setError(error)
        }
    };

    const handleLogout = async () => {
        try {
            await keycloak.logout();
            setToken(null)
        } catch (error: any) {
            setError(error)
        }
    }

    return (
        <div className={classes} {...props}>
            {isLoggedIn
                    ?
                    <button onClick={handleLogout}>logout</button>
                    :
                    <React.Fragment>
                        <input type="text" autoComplete="username" onChange={e => setUsername(e.target.value)} placeholder="username" value={username}/>
                        <input type="password" autoComplete="current-password" placeholder="password" onChange={e => setPassword(e.target.value)}
                               value={password}/>
                        <button onClick={handleLogin}>login</button>
                    </React.Fragment>}
            <Error error={error}/>
        </div>
    )
}

export default Authentication
