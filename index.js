
const express = require('express');

const urlsRouter = require('./routes/urls');

let app = express();

app.use('/', urlsRouter);

app.listen(3000);
