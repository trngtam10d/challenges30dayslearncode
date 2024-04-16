'use strict'

const AuthService = require("../services/auth.service");

class AuthController {
    signup = async (req, res, next) => {
        try {
            return res.status(201).json(await AuthService.signUp(req.body))
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();