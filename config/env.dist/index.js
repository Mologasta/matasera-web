const db = require('./db');
const redis = require('./redis');
const aws = require('./aws');
const elastic = require('./elastic');

const defaults = {
    server: {
        port: parseInt(process.env.PORT) || 1800,
        host: process.env.HOST || 'localhost',
    },
    jwtKey: 'splush',
    jwtLifeTime: 60 * 60 * 24, //24h
    jwtRefreshLifeTime: 60 * 60 * 24 * 7, // 7d
    codeDelay: 30 * 1000, // 30s
    codeLifeTime: 60 * 5, // 5m

    db,
    redis,
    aws,
    elastic,
};

module.exports = defaults;
