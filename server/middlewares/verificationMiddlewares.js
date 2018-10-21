const { TwilioService } = require('../services');
const CodeHelper = require('../helpers/codeHelper');
const LocalizationDictionary = require('../locale');

class VerificationMiddlewares {

    /**
     * Middleware to create code pair
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static createCodePair(req, res, next) {
        if (res.locals.user) {
            return next();
        }

        CodeHelper
            .generateCode(req.body.number)
            .then(codePair => res.locals.numberCodePair = codePair)
            .then(() => next())
            .catch(next);
    }

    /**
     * Create reset password code
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static resetPasswordCodePair(req, res, next) {
        CodeHelper
            .generateCode(req.body.number)
            .then(codePair => res.locals.numberCodePair = codePair)
            .then(() => next())
            .catch(next);
    }

    /**
     * Send code middleware
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static sendCode(req, res, next) {
        const code = res.locals.numberCodePair && res.locals.numberCodePair.code;
        res.locals.data = {
            alreadyRegistered: false
        };

        if (res.locals.user) {
            res.locals.data = {
                alreadyRegistered: true
            };
            return next();
        }

        TwilioService
            .sendCode({
                body: LocalizationDictionary.getFormattedText('CONFIRM_SMS_MESSAGE', req.locale, code),
                to: req.body.number
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Send code middleware
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static sendResetPassCode(req, res, next) {
        const code = res.locals.numberCodePair && res.locals.numberCodePair.code;

        TwilioService
            .sendCode({
                body: LocalizationDictionary.getFormattedText('RESET_PASSWORD_MESSAGE', req.locale, code),
                to: req.body.number
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Verify code middleware
     * @param req
     * @param res
     * @param next
     */
    static verifyCodePair(req, res, next) {
        CodeHelper
            .verifyCode(req.body.number, req.body.code)
            .then(() => next())
            .catch(next);
    }
}

module.exports = VerificationMiddlewares;


