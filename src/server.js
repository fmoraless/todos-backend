const express = require('express');

const app = express();

app.get('/test', (req, res) => {
    res.send('Hello from the backend')
})

app.listen(8088, () => {
    console.log('Server is listening on port 8088');
})