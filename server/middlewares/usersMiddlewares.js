const { User } = require('../models');
const { NotFoundEntityError } = require('../errors');
const { ERROR_CODES } = require('../constants');
const LocalizationDictionary = require('../locale');

class UsersMiddlewares {

    /**
     * Create user middleware
     * @param req
     * @param res
     * @param next
     */
    static createUser(req, res, next) {
        const user = new User(req.body);

        user.save(user)
            .then(data => res.locals.user = data)
            .then(() => next())
            .catch(() => next);
    }

    /**
     * Get user by email
     * @param req
     * @param res
     * @param next
     */
    static getUserByEmail(req, res, next) {

        User
            .findOne({ email: req.body.email })
            .then(user => {
                if(!user) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('INVALID_EMAIL', req.locale)
                    );
                }

                res.locals.user = user;
            })
            .then(() => next())
            .catch(next);
    }
}

module.exports = UsersMiddlewares;
