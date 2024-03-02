const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const helmet = require('helmet');

//openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365

const PORT = 3000;

const app = express()

app.use(helmet())

app.get('/secret', (req, res) => {
    return res.send('Secret discret');
})

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

https.createServer({
    cert: fs.readFileSync('cert.pem'),
    key: fs.readFileSync('key.pem'),
}, app).listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
})