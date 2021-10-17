import React from 'react';
import classNames from 'classnames';

// Styles
import styles from './Error.module.scss';

interface Props extends React.ComponentProps<'div'> {
    error: Error | null
}

const Error: React.FunctionComponent<Props> = ({className, error, ...props}) => {
    const classes = classNames(styles.root, className)

    if (!error) {
        return null;
    }

    return (
        <div className={classes} {...props}>
            {error?.message}
        </div>
    )
}

export default Error;
