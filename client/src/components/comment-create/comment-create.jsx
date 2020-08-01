import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [comment, setComment] = useState('');

    const handleChange = e => {
        const { value } = e.target;
        setComment(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content: comment }, config);

        setComment('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='comment'>New Comment</label>
                    <input type='text' name='comment' id='comment' onChange={handleChange} className='form-control' value={comment} />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};
