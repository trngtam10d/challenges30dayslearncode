'use strict'

const _LOCAL = 'local';
const _STAGE = 'stage';
const _PRODUCTION = 'production';

const mode = process.env.APP_MODE;
const config = {};
switch (mode) {
    case _PRODUCTION:
        config[_PRODUCTION] = {
            app: {
                port: process.env.PORT
            },
            db: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                name: process.env.DB_NAME
            }
        }
        break;
    case _STAGE:
        config[_STAGE] = {
            app: {
                port: process.env.PORT
            },
            db: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                name: process.env.DB_NAME
            }
        }
        break;
    default:
        config[_LOCAL] = {
            app: {
                port: process.env.PORT
            },
            db: {
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                name: process.env.DB_NAME
            }
        }
        break;
}

console.log(mode, 'env');
module.exports = config[mode];