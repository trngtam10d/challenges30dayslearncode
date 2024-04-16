'use strict'

const express = require('express');
const { getApiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// Check apiKey
router.use(getApiKey);

// Check permission
router.use(permission('000'));

router.use('/v1/api', require('./auth'));

module.exports = router;