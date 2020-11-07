const express = require('express');
const cors = require('cors');
const swapi = require('swapi-node');

const app = express();
const NODE_PORT = process.env.PORT || 4242;

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/persons', (req, res) => {
    swapi.getPerson().then((result) => {
        res.status(200).json(result);
    });
})

app.get('/person/:number', (req, res) => {
    swapi.getPerson(req.params.number).then((result) => {
        res.status(200).json(result);
    });
})

app.listen(NODE_PORT, () => console.log(`Server run on Port : ` + NODE_PORT));