"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AuthService.login(req.body),
        }).send(res);
    };

    signup = async (req, res, next) => {
        new CREATED({
            message: "Registered OK!",
            metadata: await AuthService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

module.exports = new AuthController();
