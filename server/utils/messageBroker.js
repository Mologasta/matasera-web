const redis = require('redis');

const config = require('../../config/index');
const logger = require('./logger');

class MessageBroker {
    constructor() {
        const options = {
            host: config.redis.host,
            port: config.redis.port,
            prefix: config.redis.options.prefix
        };

        this.handlers = {};
        this.subscriber = redis.createClient(options);
        this.publisher  = redis.createClient(options);

        this.subscriber.on('message', (channel, messageString) => {
            try {
                const message = JSON.parse(messageString);
                this.handlers[channel].forEach(handler => handler(message));
            } catch(error) {
                logger.error('Broker error:', error, error.stack);
            }
        });
    }

    publish(bridge, data) {
        let chanel = `${config.redis.options.prefix}${bridge}`;
        this.publisher.publish(
            chanel,
            JSON.stringify(data)
        );
    }

    subscribe(bridge, handler) {
        let chanel = `${config.redis.options.prefix}${bridge}`;
        if(!this.handlers[chanel]) {
            this.subscriber.subscribe(chanel);
            this.handlers[chanel] = [];
        }

        this.handlers[chanel].push(handler);

        return () => {
            this.handlers[chanel] = this.handlers[chanel].filter(h => handler !== h);
        };
    }
}

module.exports = new MessageBroker();