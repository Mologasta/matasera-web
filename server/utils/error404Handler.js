const constants = require('./../constants');
const {notFoundRouteError} = require('../errors');

const LocalizationDictionary = require('../locale');

/**
 * 404 error handler
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (req, res, next) => {
    const err = new notFoundRouteError(
        constants.ERROR_CODES.UNSUPPORTED_API,
        LocalizationDictionary.getText('ROUTE_NOT_FOUND', req.locale)
    );
    return next(err);
};