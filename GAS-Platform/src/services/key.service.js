'use strict'

const keyModel = require("../models/key.model");

const findByIdKey = async (key) => {
    const objKey = await keyModel.findOne({ key, status: true }).lean()
    return objKey;
}

module.exports = {
    findByIdKey
}