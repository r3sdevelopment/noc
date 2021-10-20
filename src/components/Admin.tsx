import React from 'react';
import classNames from 'classnames';
import useSWR from 'swr'

// Constants
import { ADMIN_POSTS_URL } from "../constants";

// Hooks
import { useKeycloak } from "../providers/keycloak-provider";

// Services
import { axios } from '../services/axios';

// Styles
import styles from './Admin.module.scss';

interface Props extends React.ComponentProps<'div'> {}

const Admin: React.FunctionComponent<Props> = ({className, ...props}) => {
    const {token, isAdmin} = useKeycloak();
    const fetcher = (url: string) => axios.get(url, {headers: {'Authorization': 'Bearer ' + token?.accessToken}}).then(res => res.data)
    const { data: posts, error } = useSWR(isAdmin ? ADMIN_POSTS_URL : null, fetcher)

    const classes = classNames(styles.root, className)

    if (!isAdmin) {
        return null;
    }

    const renderPosts = () => {
        if (error) return <div>Failed to load</div>
        if (!posts) return <div>loading...</div>

        return (
            <React.Fragment>
                <code>
                <pre>
                    {JSON.stringify(posts, undefined, 2)}
                </pre>
                </code>
                <button>create post</button>
            </React.Fragment>
        )
    }



    return (
        <div className={classes} {...props}>
            <h2>Admin</h2>
            {renderPosts()}
        </div>
    )
}

export default Admin;
