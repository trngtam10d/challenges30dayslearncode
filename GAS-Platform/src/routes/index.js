'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const strCompression = '11';
    return res.status(200).json({
        message: 'Welcome JS',
        data: strCompression.repeat(100000)
    })
});


module.exports = router;