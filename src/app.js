const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator/check');

const app = express();

// pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body-parser
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/', routes);


module.exports = app;

