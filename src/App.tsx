import React from 'react';
import classNames from "classnames";

// Components
import Admin from './components/Admin';
import Authentication from './components/Authentication';
import Posts from "./components/Posts";

// Styles
import styles from './App.module.scss'

interface Props extends React.ComponentProps<'div'> {}

const App: React.FunctionComponent<Props> = ({className, ...props}) => {
    const classes = classNames(styles.root, className)

    return (
        <div className={classes} {...props}>
            <h1>noc.r3s.dev</h1>
            <Authentication />
            <Posts />
            <Admin />
        </div>
    );
};

export default App;
