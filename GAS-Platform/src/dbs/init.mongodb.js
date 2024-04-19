'use strict'

const mongoose = require('mongoose');
const { db: { host, name, port } } = require('../configs/conf.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require('../helpers/check.connect');

class Database {
    constructor() {
        this.connect();
    }

    // Connect with mongodb
    connect(type = 'mongodb') {
        if (1 === 1) { //Dev
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString, {
                maxPoolSize: 50, //Adjust connect
            })
            .then((_) =>
                console.log("Connected MongoDb Success!")
            )
            .catch((err) => console.log("Error connect!"));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDB = Database.getInstance();

module.exports = instanceMongoDB;