import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import CommentsList from '../comments-list/comments-list';
import CommentCreate from '../comment-create/comment-create';

export default () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const fetchedPosts = await axios.get('http://localhost:4002/posts');

        setPosts(fetchedPosts.data);
    };

    useEffect(() => {
        fetchPosts();

        return () => {};
    }, []);

    console.log(posts);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div key={post.id} className='card' style={{ width: '30%', marginBottom: '20px' }}>
                <div className='card-body'>
                    <h3>{post.title}</h3>
                    <hr />
                    <h3>Comments</h3>
                    <CommentsList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPosts}</div>;
};
