import React, { useState } from 'react';
import { keycloak, useAxios } from '@r3s-dev/keycloak-js';

const App = () => {
    const axios = useAxios();
    const url = 'https://api.r3s.dev/api/posts';

    const [response, setResponse] = useState<unknown>();
    const [error, setError] = useState<unknown>();

    const reset = () => {
        setResponse(null);
        setError(null)
    }

    const handleLogin = (username: string) => async () => {
        reset();
        try {
            const data = await keycloak.login({ username, password: 'test' });
            setResponse(data)
            console.log('handleLogin',data);
        } catch (error) {
            setError(error)
        }
    };

    const handleGetPosts = async () => {
        reset();
        try {
            const {data} = await axios.get(url)
            console.log('handleQuery', data)
            setResponse(data)
        } catch (error) {
            setError(error)
        }
    }

    const handleCreatePost = async () => {
        reset();
        try {
            const {data} = await axios.post(url, {title: `My title ${new Date().getTime()}`, body: `My body ${new Date().getTime()}`})
            console.log('handleCreatePost', data)
            setResponse(data)
        } catch (error) {
            setError(error)
        }
    }

    return (
        <div>
            <h1>noc.r3s.dev</h1>
            <button onClick={handleLogin('user1')} type="button">login user1</button>
            <button onClick={handleLogin('user2')} type="button">login user2</button>
            <button onClick={handleLogin('user3')} type="button">login user3</button>
            <button onClick={handleGetPosts} type="button">get posts</button>
            <button onClick={handleCreatePost} type="button">create post</button>

            <h3>Response</h3>
            <code>
                <pre>
                    {JSON.stringify(response, undefined ,2)}
                </pre>
            </code>

            <h3>Error</h3>
            <code style={{color: 'red'}}>
                <pre>
                    {JSON.stringify(error, undefined ,2)}
                </pre>
            </code>
        </div>
    );
};

export default App;
