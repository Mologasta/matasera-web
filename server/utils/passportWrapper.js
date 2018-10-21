const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const {SessionHelper} = require('./../helpers');
const {AuthenticateError} = require('../errors');
const {ERROR_CODES, USER_ROLES} = require('./../constants');

const LocalizationDictionary = require('../locale');

/**
 * User auth handler
 */
passport.use(new BearerStrategy((token, cb) => {
    SessionHelper
        .getSession(token)
        .then(user => cb(null, user))
        .catch(() => cb(new AuthenticateError(
            ERROR_CODES.UNAUTHORIZED,
            LocalizationDictionary.getText('INVALID_TOKEN')
        )));
}));

/**
 * Create authorization handler
 * @param role
 * @returns {function(*=, *=, *=)}
 */
function createAuthHandler(role) {
    return (req, res, next) => {
        passport.authenticate('bearer', {session: false}, (error, user) => {
            if (error || !user) {
                return next(new AuthenticateError(
                    ERROR_CODES.UNAUTHORIZED,
                    LocalizationDictionary.getText('INVALID_TOKEN', req.locale)
                ));
            }

            if (role && role !== user.role) {
                return next(new AuthenticateError(
                    ERROR_CODES.UNAUTHORIZED,
                    LocalizationDictionary.getText('INVALID_TOKEN', req.locale)
                ));
            }

            req.user = user;
            next();
        })(req, res, next);
    };
}

module.exports = {
    riderAuthHandler: createAuthHandler(USER_ROLES.RIDER),
    adminAuthHandler: createAuthHandler(USER_ROLES.ADMIN),
    driverAuthHandler: createAuthHandler(USER_ROLES.DRIVER),
    createAuthHandler,
};
