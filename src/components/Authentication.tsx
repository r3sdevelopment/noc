import React, { useState } from 'react';
import classNames from 'classnames';

// Components
import ErrorMessage from './ErrorMessage';

// Styles
import styles from './Authentication.module.scss';
import { useKeycloak } from "../providers/keycloak-provider";

interface Props extends React.ComponentProps<'div'> {}

const Authentication: React.FunctionComponent<Props> = ({className, ...props}) => {
    const {error, isLoggedIn, login, logout} = useKeycloak();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const classes = classNames(styles.root, className);

    const reset = () => {
        setUsername('');
        setPassword('')
    }

    const handleLogin = async () => {
        await login(username, password)
        reset();
    };

    const handleLogout = async () => {
        await logout()
    }

    const renderLogin = () => {
        if (isLoggedIn) {
            return  <button onClick={handleLogout}>logout</button>
        }
        return (
            <React.Fragment>
                <input type="text" autoComplete="username" onChange={e => setUsername(e.target.value)} placeholder="username" value={username}/>
                <input type="password" autoComplete="current-password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password}/>
                <button onClick={handleLogin}>login</button>
            </React.Fragment>
        )
    }

    return (
        <div className={classes} {...props}>
            {renderLogin()}
            <ErrorMessage error={error}/>
        </div>
    )
}

export default Authentication
