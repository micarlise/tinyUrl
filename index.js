
const express = require('express');
const morgan = require('morgan');

const urlsRouter = require('./routes/urls');

let logger = morgan('short');
let app = express();

app.use(logger);

app.use('/', urlsRouter);

app.listen(3000);
