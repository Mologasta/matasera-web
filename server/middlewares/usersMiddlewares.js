const { Rider } = require('../models');
const { ValidationError, NotFoundEntityError } = require('../errors');
const { UniqueConstraintError } = require('sequelize');
const { ERROR_CODES, USER_STATES, RIDER_CHARACTERISTICS, PREFERENCES_SCOPES } = require('../constants');
const LocalizationDictionary = require('../locale');

class UsersMiddlewares {

    /**
     * Create rider middleware
     * @param req
     * @param res
     * @param next
     */
    static createRider(req, res, next) {
        res.locals.needVerification = !req.body.isAdult || req.body.characteristics === RIDER_CHARACTERISTICS.ADVANCED_MEDICAL_NEEDS;

        Rider
            .create(Object.assign(req.body, { isVerified: !res.locals.needVerification }))
            .then(user => res.locals.user = user)
            .then(() => next())
            .catch(ValidationError.mapSequelizeValidationError({
                email: LocalizationDictionary.getText('EMAIL_MUST_BE_UNIQUE', req.locale),
                number: LocalizationDictionary.getText('NUMBER_MUST_BE_UNIQUE', req.locale)
            }, UniqueConstraintError))
            .catch(next);
    }

    /**
     * Find rider by id middleware
     * @param req
     * @param res
     * @param next
     */
    static findUserById(req, res, next) {
        const riderId = req.params.riderId || res.locals.userId || req.user.id;
        const scopes = ['withLocation', 'withCards', 'withRide', 'withDevices', 'withDebt', 'withUpdateRequest'];

        Rider
            .scope(scopes)
            .findById(riderId)
            .then(user => {
                if(!user) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('RIDER_NOT_FOUND', req.locale)
                    );
                }

                res.locals.user = user;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Get rider by number
     * @param req
     * @param res
     * @param next
     */
    static getUserByNumber(req, res, next) {
        const scopes = ['withLocation', 'withCards', 'withRide', 'withDevices', 'withDebt', 'withUpdateRequest'];

        Rider
            .scope(scopes)
            .find({ where: { number: req.body.number } })
            .then(user => {
                if(!user) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('INVALID_NUMBER', req.locale)
                    );
                }

                res.locals.user = user;
            })
            .then(() => next())
            .catch(next);
    }

    static formatUsers(req, res, next) {
        res.locals.data = res.locals.riders.map(r => r.baseFormat());
        res.locals.count = res.locals.ridersCount;
        next();
    }
}

module.exports = UsersMiddlewares;