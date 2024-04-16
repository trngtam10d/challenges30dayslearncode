'use strict'

const storeModel = require("../models/store.model");

class StoreService {
    static createPublicKey = async ({ userId, publicKey, privateKey }) => {
        try {
            const tokens = await storeModel.create({
                user: userId,
                publicKey,
                privateKey
            });

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = StoreService;