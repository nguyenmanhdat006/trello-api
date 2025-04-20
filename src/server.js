import express from 'express';
const app = express();

const hostname = 'localhost';
const port = 8017;

app.get('/', function (req, res) {
    res.send('<h1>Hello world node js</h1>')
});

app.listen(port, hostname, () => {
    console.log(`I'm running at http://${hostname}:${port}/`);
});
