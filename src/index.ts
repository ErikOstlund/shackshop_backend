import express from 'express';
const app = express();
const port = 9000;

app.get('/', (req, res) => res.send('Shack Shop!'));

app.listen(port);

console.log(`[app]: Ready at http://localhost:${port}`);
