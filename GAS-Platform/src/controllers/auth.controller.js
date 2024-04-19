'use strict'

const { CREATED } = require("../core/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    signup = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await AuthService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send(res);
    };
}

module.exports = new AuthController();