'use strict'

const StatusCode = {
    OK: 200,
    CREATE: 201
};

const ReasonStatusCode = {
    OK: 'Success',
    CREATE: 'Created!'
};

class SuccessResponse {
    constructor({ message, statusCode = statusCode.OK, reasonStatusCode =  ReasonStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({ options = {}, message, statusCode = StatusCode.CREATE, reasonStatusCode = ReasonStatusCode.CREATE, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options
    }
}

module.exports = {
    OK,
    CREATED
}