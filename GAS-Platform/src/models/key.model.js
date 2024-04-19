'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
var keySchema = new mongoose.Schema({
    key:{
        type: String,
        required:true,
        unique:true,
    },
    status:{
        type: Boolean,
        default: true
    },
    permissions:{
        type:[String],
        required: true,
        enum: ['000', '111', '222']
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keySchema);