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

// init routes
app.get('/', (req, res, next) => {
    const strCompression = 'llll4';

    return res.status(200).json({
        message: 'Welcome JS',
        data: strCompression.repeat(10000)
    })
});

// handling error

module.exports = app;