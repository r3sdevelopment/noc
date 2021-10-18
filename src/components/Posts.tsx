import React from 'react';
import useSWR from 'swr';
import classNames from 'classnames';

// Constants
import { POSTS_URL } from "../constants";

// Services
import { axios } from "../services/axios";

// Styles
import styles from './Posts.module.scss';

enum PostStatus {
    DRAFT,
    PUBLISHED
}

interface Post {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleteAt: string | null;
    body: string;
    imageUrl: string;
    title: string;
    userId: string;
    status: PostStatus;
}

interface Props extends React.ComponentProps<'div'> {}

const Posts: React.FunctionComponent<Props> = ({className, ...props}) => {
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const { data: posts, error } = useSWR<Post[]>(POSTS_URL, fetcher)

    const classes = classNames(styles.root)

    const renderPosts = () => {
        if (!posts?.length) {
            return <p>No latest posts</p>
        }

        return (
            <div className={classes} {...props}>
                {posts?.sort((postA, postB) => {
                    return new Date(postB.updatedAt).getTime() - new Date(postA.updatedAt).getTime()
                }).map((post) => {
                    return (
                        <div className={styles.post} key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <small>Created: {new Date(post.createdAt).toString()}</small>
                            <small>Updated: {new Date(post.updatedAt).toString()}</small>
                        </div>
                    )
                })}
            </div>
        )
    }

    if (error) return <div>failed to load</div>
    if (!posts) return <div>loading...</div>

    return (
        <div className={styles.root}>
            <h2>Latest posts</h2>
            {renderPosts()}
        </div>
    )
}

export default Posts
