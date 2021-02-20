const express = require('express');
const bodyParser = require('body-parser');

const keyGen = require('../lib/keyGen');
const cassyClient = require('../lib/cassandra');

function getUrls(req, res) {
    
    cassyClient.getAllUrls()
        .then(keyMap => res.send(keyMap));

};

function redirectToUrl(req, res) {

    cassyClient.getUrl(req.params.url)
    .then((nextUrl) => {
        if (nextUrl) {
            res.redirect(nextUrl);
        } else { 
            res.redirect('http://localhost:3000/');
        }
    });

}

function createUrl(req, res) {

    let newUrl = req.body.url
    keyGen()
        .then(shortKey => {
            cassyClient.insertCode(shortKey, newUrl)
            .then(() => res.send(shortKey));
        });

}

urlRouter = express.Router();

urlRouter.get('/', getUrls);
urlRouter.get('/:url', redirectToUrl);
urlRouter.post('/', bodyParser.json(), createUrl);

module.exports = urlRouter;
