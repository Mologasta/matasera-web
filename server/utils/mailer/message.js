'use strict';

const swig = require('swig');

const DEFAULT_MESSAGE = {
    from: '',
    sender: '',
    recipient: '',
    subject: '',
    text: '',
    template: '',
    replaces: {},
    attachments: [],
};
const ATTRIBUTES = ['from', 'fromName', 'to', 'subject', 'attachments'];

/**
 * Class for email message
 */
class Message {
    constructor(options) {
        const properties = Object.assign({}, DEFAULT_MESSAGE, options);
        this._message = {};

        this.from = properties.from;
        this.sender = properties.sender;
        this.subject = properties.subject;
        this.recipient = properties.recipient;
        this.templateUrl = properties.templateUrl;
        this.replaces = properties.replaces;
        this.attachments = properties.attachments;
    }

    set from(from) {
        if (from) {
            this._message.from = from;
        }
    }

    set sender(sender) {
        if (sender) {
            this._message.fromName = sender;
        }
    }

    set subject(subject) {
        if (subject) {
            this._message.subject = subject;
        }
    }

    set recipient(recipient) {
        if (recipient) {
            this._message.to = Array.isArray(recipient) ? recipient : [recipient];
        }
    }

    set text(bodyText) {
        if (bodyText) {
            this._message.bodyText = bodyText;
        }
    }

    set templateUrl(templateUrl) {
        if (templateUrl) {
            this._message.templateUrl = templateUrl;
        }
    }

    set replaces(replaces) {
        if (replaces) {
            this._message.replaces = replaces;
        }
    }

    set attachments(attachments) {
        if (attachments) {
            this._message.attachments = attachments;
        }
    }


    /**
     * Build elastic email message
     */
    build() {
        let message = this._message;
        let result = {};
        if (!message.bodyText && !message.templateUrl) return Promise.reject(new Error('Invalid message contents'));
        for (let attribute of ATTRIBUTES) {
            if (message[attribute]) result[attribute] = message[attribute];
        }

        if (!message.templateUrl) {
            result.bodyText = message.bodyText;
            return Promise.resolve(result);
        }

        return this._compileTemplate(message)
            .then((html) => {
                result.bodyHtml = html;
                return result;
            });
    }

    /**
     * Compile template
     * @param message
     * @returns {Promise.<String>}
     * @private
     */
    _compileTemplate(message) {
        return new Promise((resolve, reject) => {
            swig.compileFile(message.templateUrl, null, (error, template) => {
                if (error) {
                    return reject(error);
                }
                try {
                    resolve(template(message.replaces));
                } catch (err) {
                    return reject(error);
                }
            });
        })
    }
}

module.exports = Message;
