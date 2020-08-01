const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ extended: false }));

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'COMMENT_CREATED') {
        const status = data.content.toLowerCase().includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'COMMENT_MODERATED',
            data: { id: data.id, postId: data.postId, status, content: data.content }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Listining on port 4003');
});
