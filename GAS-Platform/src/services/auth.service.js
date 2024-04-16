'use strict'

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const shopModel = require("../models/shop.model");
const StoreService = require('./store.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AuthService {

    static signUp = async ({ name, email, password }) => {
        try {
            // step1: check email exits??
            const holderShop = await shopModel.findOne({ email }).lean();
            if (holderShop) {
                return {
                    code: 'xxx',
                    msg: 'Email already!'
                };
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            });

            if (newShop) {
                // Created { privateKey, publicKey } -> Security
                // const { privateKey, publicKey } = crypto.generateKeyPairSync(
                //     "rsa",
                //     {
                //         modulusLength: 4096,
                //         publicKeyEncoding: {
                //             type: "pkcs1", //pkcs8
                //             format: "pem",
                //         },
                //         privateKeyEncoding: {
                //             type: "pkcs1",
                //             format: "pem",
                //         },
                //     }
                // );

                const publicKey = crypto.randomBytes(64).toString('hex');
                const privateKey = crypto.randomBytes(64).toString('hex');

                //save model StoreKey.
                const keyStore = await StoreService.createPublicKey({
                    userId: newShop._id,
                    publicKey,
                    privateKey
                });
    
                if (!keyStore) {
                    return {
                        code: 'xxx',
                        msg: 'keyStore error!'
                    };
                }

                // created token pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx',
                msg: error.message,
                status: 'error'
            }
        }
    };
}

module.exports = AuthService;