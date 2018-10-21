const SequelizeBase = require('sequelize');
const logger = require('./logger');
const config = require('./../../config');
const timestamp = require('./hooks/timestamp');

let _instance = null;

class Sequelize {
    constructor() {
        if (!_instance) {
            _instance = new SequelizeBase(config.db.dbname, config.db.user, config.db.password, {
                host: config.db.host,
                dialect: 'mysql',
                timezone: config.db.timezone,
                dialectOptions: {
                    charset: config.db.charset
                },
                pool: {
                    max: config.db.maxConnections,
                    min: 0,
                    idle: config.db.delayBeforeReconnect
                },
                // logging: true,
                define: {
                    hooks: {
                        beforeCreate: timestamp.beforeCreate,
                        beforeUpdate: timestamp.beforeUpdate,
                        beforeBulkCreate: timestamp.beforeBulkCreate,
                        beforeBulkUpdate: timestamp.beforeBulkUpdate
                    }
                }
            });

            _instance.Sequelize = SequelizeBase;
        }

        return _instance;
    }
}

module.exports = new Sequelize();