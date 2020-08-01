import React from 'react';

// Components
import PostCreate from './components/post-create/post-create';
import PostList from './components/post-list/post-list';

export default () => {
    return (
        <div className='container'>
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>Posts</h1>
            <PostList />
        </div>
    );
};
