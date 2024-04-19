'use strict'

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: 'authorization'
}

const { BadRequestError } = require("../core/error.response");
const { findByIdKey } = require("../services/key.service");

const getApiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            throw new BadRequestError('Error: NOT FOUND!');
        }

        const objKey = await findByIdKey(key);
        if (!objKey) {
            throw new BadRequestError('Error: NOT FOUND!');
        }
        req.objKey = objKey
        return next()

    } catch (error) {
        console.log(error);
    }
}

const permission = ( permission ) => {
    return (req, res, next) => { 
        if (!req.objKey.permissions) {
            throw new BadRequestError('Error: Permissions denied!');
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            throw new BadRequestError('Error: Permissions denied!');
        }

        return next();
    };
}

const asyncHandle = fn => { //fn -> asyncHandle(function);
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

module.exports = {
    getApiKey,
    permission,
    asyncHandle
}