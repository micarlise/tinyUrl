
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const urlsRouter = require('./routes/urls');

let logger = morgan('short');
let app = express();

app.use(cors());
app.use(logger);

app.use('/', urlsRouter);

app.listen(3000);
