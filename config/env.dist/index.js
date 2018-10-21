const db = require('./db');
const redis = require('./redis');
const twilio = require('./twilio');
const aws = require('./aws');
const mailer = require('./mailer');
const stripe = require('./stripe');
const socket = require('./ioConfig');
const apn = require('./apn');

const defaults = {
    server: {
        port: parseInt(process.env.PORT) || 1800,
        host: process.env.HOST || 'localhost',
    },
    jwtKey: 'secret-string',
    jwtLifeTime: 60 * 60 * 24, //24h
    jwtRefreshLifeTime: 60 * 60 * 24 * 7, // 7d
    codeDelay: 30 * 1000, // 30s
    codeLifeTime: 60 * 5, // 5m

    db,
    redis,
    twilio,
    aws,
    mailer,
    stripe,
    socket,
    apn,
};

module.exports = defaults;
