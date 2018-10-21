const redis = require('redis');
const logger = require('./logger');
const config = require('./../../config');

const REDIS_MAX_ATTEMPTS = config.redis.options.max_attempts|| 10;
const REDIS_RETRY_MAX_DELAY = config.redis.retry_max_delay || 1000;

let instance = null;

class Redis {
    constructor() {
        if (!instance) {
            instance = redis.createClient({
                host: config.redis.host,
                port: config.redis.port,
                prefix: config.redis.options.prefix,
                retry_strategy: ((options) => {
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        // End reconnecting after a specific timeout
                        // and flush all commands with a individual error
                        return new Error('Retry time exhausted');
                    }
                    if (options.times_connected > REDIS_MAX_ATTEMPTS) {
                        // End reconnecting with built in error
                        return undefined;
                    }
                    // reconnect after
                    return REDIS_RETRY_MAX_DELAY;
                }),
            });

            instance.on('reconnecting', (param) => {
                logger.log('warn', 'Redis connection has not been established. Reconnecting... Attempt: %s ', param.attempt);
                if (param.attempt >= REDIS_MAX_ATTEMPTS) {
                    logger.error('Web server is going to shut down. Disconnecting...');
                    process.exit(1);
                }
            });

            instance.on('error', (err) => {
                logger.log('error', err);
            });

            instance.on('connect', () => {
                logger.log('info', 'Redis successfully connected');
            });
        }

        return instance;
    }
}

module.exports = new Redis();
