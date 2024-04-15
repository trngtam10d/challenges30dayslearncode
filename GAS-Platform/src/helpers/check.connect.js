'use strict'

const mongoose = require('mongoose');
const os = require('os');
const _SECONDS = 5000;
const process = require('process');

// Count connect mongoose
const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${number}`);
};

// Check over load
const checkOverload = () => {
    setInterval(() => {
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Example
        const maxConnection = numCores * 5;

        console.log(`Active connections: ${numConnection}`);
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

        if (maxConnection < numConnection) {
            console.log('Connection overload detected!');
        }


    }, _SECONDS); // Monitor every 5 seconds
};

module.exports = {
    countConnect,
    checkOverload
}