import React from 'react';
import classNames from 'classnames';

// Hooks
import { useKeycloak } from "../providers/keycloak-provider";

// Styles
import styles from './Admin.module.scss';

interface Props extends React.ComponentProps<'div'> {}

const Admin: React.FunctionComponent<Props> = ({className, ...props}) => {
    const {token} = useKeycloak();

    // const url = 'https://api.r3s.dev/api/posts';
    // // const url = 'http://localhost:8000/api/posts';
    //
    // const [response, setResponse] = useState<unknown>();
    // const [error, setError] = useState<unknown>();
    //
    // const reset = () => {
    //     setResponse(null);
    //     setError(null)
    // }
    //
    //
    //
    // const handleGetPosts = async () => {
    //     reset();
    //     try {
    //         const {data} = await axios.get(url)
    //         console.log('handleQuery', data)
    //         setResponse(data)
    //     } catch (error) {
    //         setError(error)
    //     }
    // }
    //
    // const handleCreatePost = async () => {
    //     reset();
    //     try {
    //         const {data} = await axios.post(url, {title: `My title ${new Date().getTime()}`, body: `My body ${new Date().getTime()}`})
    //         console.log('handleCreatePost', data)
    //         setResponse(data)
    //     } catch (error) {
    //         setError(error)
    //     }
    // }

    const classes = classNames(styles.root, className)

    if (!token?.hasRole("admin")) {
        return null;
    }

    return (
        <div className={classes} {...props}>
            <h2>Admin</h2>
        </div>
    )
}

export default Admin;
