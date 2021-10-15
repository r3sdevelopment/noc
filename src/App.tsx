import React from 'react';
import Authentication from './components/Authentication';

const App = () => {
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

    return (
        <div>
            <h1>noc.r3s.dev</h1>
            <Authentication />
        </div>
    );
};

export default App;
