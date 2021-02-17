const express = require('express');
const bodyParser = require('body-parser');

const shortLinks = require('../fixtures/shortLinks');

const keyGen = require('../lib/keyGen');

function getUrls(req, res) {
    res.send(shortLinks);
};

function redirectToUrl(req, res) {
    nextUrl = undefined;

    if (shortLinks[req.params.shortLink]) {
        nextUrl = shortLinks[req.params.shortLink];
    }

    if (nextUrl) {
        res.redirect(nextUrl);
    } else { 
        res.redirect('http://localhost:3000/');
    }
}

function createUrl(req, res) {
    let newUrl = req.body.url
    keyGen()
        .then(shortKey => {
            shortLinks[shortKey] = newUrl;
            res.send(shortKey);
        });
}

urlRouter = express.Router();

urlRouter.get('/', getUrls);
urlRouter.get('/:shortLink', redirectToUrl);
urlRouter.post('/', bodyParser.json(), createUrl);

module.exports = urlRouter;
