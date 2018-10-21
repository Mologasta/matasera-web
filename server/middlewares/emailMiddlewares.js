const { EMAILS, USER_STATES } = require('../constants');
const logger = require('../utils/logger');
const EmailService = require('../services/emailService');
const Message = require('../utils/mailer/message');

class EmailMiddlewares {

    static sendNotification(req, res, next) {
        let config;
        const user = res.locals.user;
        const specific = user.state === USER_STATES.ACTIVE ? EMAILS.specific.UNBLOCKED : EMAILS.specific.BLOCKED;

        config = Object.assign({
            recipient: user.email,
        }, specific, EMAILS.common);

        EmailService
            .send(new Message(config))
            .then(() => next())
            .catch(error => {
                logger.error(error);
                next();
            });
    }
}

module.exports = EmailMiddlewares;