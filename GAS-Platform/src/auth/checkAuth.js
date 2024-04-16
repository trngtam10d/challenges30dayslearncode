'use strict'

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: 'authorization'
}

const { findByIdKey } = require("../services/key.service");

const getApiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                msg: 'Forbidden Error'
            });
        }

        const objKey = await findByIdKey(key);
        if (!objKey) {
            return res.status(403).json({
                msg: 'Forbidden Error'
            });
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
            return res.status(403).json({
                msg: 'Permissions denied!'
            });
        }

        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                msg: 'Permissions denied!'
            });
        }

        return next();
    };
}

module.exports = {
    getApiKey,
    permission
}