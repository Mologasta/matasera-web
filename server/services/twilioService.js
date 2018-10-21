const Twilio = require('../utils/twilio');
const config = require('../../config');

class TwilioService {

    /**
     * Send custom message
     * @param { body, to }
     */
    static sendCode({ body, to }) {
        return Twilio.messages.create({
            body,
            from: config.twilio.twilioNumber,
            to
        });
    }
}

module.exports = TwilioService;