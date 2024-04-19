require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();

// INIT MIDDLEWARES
app.use(morgan('dev')); //morgan used: combined, common, short, tiny
app.use(helmet()); // Security cookie Similar to CSRF
app.use(compression()); //Reduce data load and bandwidth ex): 700kb -> 100kb
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// INIT DB
require('./dbs/init.mongodb');
// const { checkOverload } = require('./helpers/check.connect');
// checkOverload();

// INIT ROUTES
app.use('', require('./routes'));

// HANDLE ERROR
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        msg: error.message || 'Internal Server Error!'
    });
});

module.exports = app;