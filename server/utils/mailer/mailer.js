'use strict';

const request = require('request');

const Message = require('./message');
const {mailer} = require('../../../config');

const API_URL = 'https://api.elasticemail.com/v2/email/send';
const INVALID_MESSAGE = 'Invalid param, message must be a Message type!';

class Mailer {
    constructor(config) {
        this.config = config;
    }

    /**
     * Send message
     * @param {Message} message
     * @returns {Promise}
     */
    send(message) {
        if (!(message instanceof Message)) {
            let error = new TypeError(INVALID_MESSAGE);
            return Promise.reject(error);
        }

        return message
            .build()
            .then(message => this.sendRaw(message));
    }

    /**
     * Send raw message
     * @param {Object} message
     * @returns {Promise}
     */
    sendRaw(message) {
        return this._sendRequest({url: API_URL, config: this.config, message});
    }

    /**
     * Send request
     * @param options
     * @param options.url
     * @param options.message
     * @param options.config
     * @private
     */
    _sendRequest(options) {
        let formData = Object.assign({}, options.message, options.config);

        return new Promise((resolve, reject) => {
            request.post(options.url, {formData}, (error, response) => {
                if (error) {
                    return reject(error);
                }

                try {
                    const result = JSON.parse(response.body);
                    if (!result.success) {
                        throw new Error(result.error);
                    }

                    resolve(result.data);
                } catch (err) {
                    reject(err);
                }
            });
        });
    }
}

module.exports = new Mailer(mailer);