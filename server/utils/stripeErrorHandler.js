const { ERROR_CODES, GENERAL_ERROR_MESSAGES } = require('../constants');

/**
 * Stripe error handler
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (err, req, res, next) => {
    if (!err) {
        return next();
    }

    if (err && err.statusCode) {
        err.status = err.statusCode;
        err.code = ERROR_CODES.UNPROCESSABLE;
        err.generalErrorMessage = err.message;
        err.message = GENERAL_ERROR_MESSAGES.STRIPE_ERROR;
    }
    return next(err);
};