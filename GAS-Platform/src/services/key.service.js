'use strict'

const crypto = require('crypto');
const keyModel = require("../models/key.model");

const findByIdKey = async (key) => {
    // const newKey = await keyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['000'] });
    // console.log('newKey: ', newKey)
    const objKey = await keyModel.findOne({ key, status: true }).lean()
    return objKey;
}

module.exports = {
    findByIdKey
}