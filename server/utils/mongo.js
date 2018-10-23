const mongose = require('mongoose');
const conf = require('../../config');
const logger = require('../utils/logger');
const url = `${conf.db.url}${conf.db.host}/${conf.db.dbname}`;

class Mongo {

    constructor() {
        this.client = mongose;
        this.open()
    }

    open() {
        this.client.connect(url, {useNewUrlParser: true})
            .then(() => logger.info('mongo connection opened'))
            .catch(err => logger.error(err));
    }

    close() {
        this.client.mongo.close()
            .then(() => logger.info('mongo connection closed'))
            .catch(err => logger.error(err));
    }
}

module.exports = new Mongo();

