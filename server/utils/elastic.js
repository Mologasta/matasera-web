const elastic = require('elasticsearch');
const logger = require('./logger');
const conf = require('../../config');

const client = new elastic.Client({
    host: conf.elastic.host,
    log: conf.elastic.level
});

client.ping({
    requestTimeout: conf.elastic.requestTimeout
}, function (error) {
    if (error) {
        logger.error('elasticsearch cluster is down!');
    } else {
        logger.info('elasticsearch connected');
    }
});

module.exports = client;


