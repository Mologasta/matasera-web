const { Email } = require('../models');
const mailer = require('../utils/mailer/mailer');
const { EMAIL_STATUSES } = require('../constants');

class EmailService {

    /**
     * Save email message into database and send it
     * @param {*} body
     */
    static send(body) {
        return Email
            .create({status: EMAIL_STATUSES.NOT_SENT, emailBody: JSON.stringify(body)})
            .tap(() => mailer.send(body))
            .then(email => email.update({status: EMAIL_STATUSES.SENT}));
    }
}

module.exports = EmailService;