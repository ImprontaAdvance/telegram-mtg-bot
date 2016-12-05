const express = require('express');
const requests = require('./requests.js');

const app = express();

app.get('/price', function(req, res) {
    if(!req.query.name) {
        res.status(400).send({message: 'Missing name param'});
    };

    requests.getCardFromMkm(req.query.name)
    .then((cards) => {
        if(cards.length === 0)
            res.status(404).send();

        res.status(200).send(cards);
    })
    .catch((e) => {
        res.status(404).send();
    });
});

app.listen(3002, function () {
    console.log('Mkm provider listening on port 3002!');
});
