import React, { useState } from 'react';
import axios from 'axios';

export default () => {
    const [title, setTitle] = useState('');

    const handleChange = e => {
        const { value } = e.target;
        setTitle(value);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        await axios.post('http://localhost:4000/posts', { title }, config);

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' id='title' onChange={handleChange} className='form-control' value={title} />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};
