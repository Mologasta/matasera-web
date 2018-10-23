const { User } = require('../models');
const { NotFoundEntityError } = require('../errors');
const { ERROR_CODES } = require('../constants');
const LocalizationDictionary = require('../locale');

class UsersMiddlewares {

    /**
     * Create rider middleware
     * @param req
     * @param res
     * @param next
     */
    static createUser(req, res, next) {
        const user = new User(req.body);

        user.save()
            .then(data => {
                console.log('noice')
            })
            .then(() => next())
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
