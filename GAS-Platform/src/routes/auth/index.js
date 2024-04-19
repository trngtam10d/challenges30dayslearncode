'use strict'

const express = require('express');
const authController = require('../../controllers/auth.controller');
const { asyncHandle } = require('../../auth/checkAuth');
const router = express.Router();

router.post('/shop/signup', asyncHandle(authController.signup));
router.post('/shop/login', asyncHandle(authController.login));

module.exports = router;