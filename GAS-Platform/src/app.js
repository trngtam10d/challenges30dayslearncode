require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();

// init middlewares
app.use(morgan('dev')); //morgan used: combined, common, short, tiny
app.use(helmet()); // Security cookie Similar to CSRF
app.use(compression()); //Reduce data load and bandwidth ex): 700kb -> 100kb

// init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

// init routes
app.use('', require('./routes'));

// handling error

module.exports = app;