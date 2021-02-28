const request = require('supertest');
const express = require('express');

const urlsRouter = require('../routes/urls');

let app = express();

app.use('/', urlsRouter);

describe('API', function() {

    it('GET /', function(done) {
        request(app)
            .get('/')
            .expect(200)
            .then(response => {
                return done();
            });
    });
});
