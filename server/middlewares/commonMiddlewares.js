const {
    NotFoundEntityError,
    BadRequestError,
    ForbiddenError,
    AuthenticateError,
    UnprocessableEntityError } = require('../errors');
const { Rider, Driver } = require('../models');
const { ERROR_CODES, USER_ROLES, USER_STATES } = require('../constants');
const LocalizationDictionary = require('../locale');
const PasswordHelper = require('../helpers/passwordHelper');

class CommonMiddlewares {

    /**
     * Check password middleware
     * @param req
     * @param res
     * @param next
     * @private
     */
    static checkPassword(req, res, next) {
        const password = req.body.password;
        const user = res.locals.user;

        if(!user) {
            return next(new NotFoundEntityError(
                ERROR_CODES.ENTITY_NOT_FOUND,
                LocalizationDictionary.getText('USER_NOT_FOUND', req.locale)
            ));
        }

        if (!PasswordHelper.compare(password + user.salt, user.password)) {
            return next(new BadRequestError(
                ERROR_CODES.UNAUTHORIZED,
                LocalizationDictionary.getText('INVALID_PASSWORD', req.locale)
            ));
        }

        next();
    }

    /**
     * Update user's password middleware
     * @param req
     * @param res
     * @param next
     * @private
     */
    static updatePassword(req, res, next) {
        const user = res.locals.user;
        const password = req.body.newPassword || req.body.password;

        user
            .update({ password, lastPasswordUpdate: new Date() })
            .then(user => res.locals.user = user)
            .then(() => next())
            .catch(next);
    }

    /**
     * Check email availability middleware
     * @param req
     * @param res
     * @param next
     */
    static checkEmail(req, res, next) {
        let model = req.body.role === USER_ROLES.DRIVER ? Driver : Rider;

        model
            .find({ where: { email: req.body.email } })
            .then(user => {
                if(user) {
                    throw new UnprocessableEntityError(
                        ERROR_CODES.UNPROCESSABLE,
                        LocalizationDictionary.getText('EMAIL_ALREADY_TAKEN', req.locale)
                    );
                }

            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Check user number
     * @param req
     * @param res
     * @param next
     */
    static findUserByNumber(req, res, next) {
        let model = req.body.role === USER_ROLES.DRIVER ? Driver : Rider;

        model
            .find({ where: { number: req.body.number } })
            .then(user => {
                if (!user) {
                    return next(new BadRequestError(
                        ERROR_CODES.BAD_REQUEST,
                        LocalizationDictionary.getText('USER_NOT_FOUND', req.locale)
                    ));
                }

                res.locals.user = user;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Check user number
     * @param req
     * @param res
     * @param next
     */
    static checkNumber(req, res, next) {
        let model = req.body.role === USER_ROLES.DRIVER ? Driver : Rider;

        model
            .find({ where: { number: req.body.number } })
            .then(user => {
                if (user) {
                    res.locals.user = user;
                }
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Check if user is verified
     * @param req
     * @param res
     * @param next
     */
    static checkVerification(req, res, next) {
        if (!res.locals.user.isVerified) {
            return next(new AuthenticateError(
                ERROR_CODES.UNAUTHORIZED,
                LocalizationDictionary.getText('NOT_VERIFIED', req.locale)
            ));
        }

        next();
    }

    /**
     * Check if user is blocked
     * @param req
     * @param res
     * @param next
     */
    static checkBlocked(req, res, next) {
        if (res.locals.user.state === USER_STATES.BLOCKED) {
            return next(new AuthenticateError(
                ERROR_CODES.UNAUTHORIZED,
                LocalizationDictionary.getText('BLOCKED', req.locale)
            ));
        }

        next();
    }

    /**
     * Unblock user middleware
     * @param req
     * @param res
     * @param next
     */
    static unblockUser(req, res, next) {
        const user = res.locals.user;

        user
            .update({ state: USER_STATES.ACTIVE })
            .then(user => res.locals.user = user)
            .then(() => next())
            .catch(next);
    }

    /**
     * Check access middleware
     * @param req
     * @param res
     * @param next
     * @private
     */
    static checkAccess(req, res, next) {
        const userId = parseInt(req.params.driverId || req.params.riderId);
        if (req.user.id !== userId) {
            return next(new ForbiddenError(
                ERROR_CODES.ACCESS_DENIED,
                LocalizationDictionary.getText('ACCESS_DENIED', req.locale)
            ));
        }

        next();
    }

    /**
     * Format user data
     * @param req
     * @param res
     * @param next
     */
    static formatUser(req, res, next) {
        res.locals.data = res.locals.user.baseFormat();
        next();
    }
}

module.exports = CommonMiddlewares;