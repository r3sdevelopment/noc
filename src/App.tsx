import React from 'react';
import classNames from "classnames";

// Components
import Admin from './components/Admin';
import Authentication from './components/Authentication';
import Posts from "./components/Posts";
import KeycloakProvider from "./providers/keycloak-provider";

// Styles
import styles from './App.module.scss'

interface Props extends React.ComponentProps<'div'> {}

const App: React.FunctionComponent<Props> = ({className, ...props}) => {
    const classes = classNames(styles.root, className)

    return (
        <KeycloakProvider>
            <div className={classes} {...props}>
                <header>
                    <h1>noc.r3s.dev</h1>
                </header>
                <Authentication />
                <Posts />
                <Admin />
                <footer>
                    <small>
                        {process.env.NODE_ENV}
                    </small>
                </footer>
            </div>
        </KeycloakProvider>
    );
};

export default App;
