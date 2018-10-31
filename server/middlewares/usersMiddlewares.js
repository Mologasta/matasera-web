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

        user.save(user)
            .then(data => res.locals.user = data)
            .then(() => next())
            .catch((err) => {
                next(err)
            });
    }

    /**
     * Find rider by id middleware
     * @param req
     * @param res
     * @param next
     */
    static findUserById(req, res, next) {
        const userId = req.params.userId || res.locals.userId || req.user.id;

        User
            .findById(userId)
            .then(user => {
                if(!user) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('USER_NOT_FOUND', req.locale)
                    );
                }

                res.locals.user = user;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Find users middleware
     * @param req
     * @param res
     * @param next
     */
    static findUsers(req, res, next) {

        User
            .find({username: { $regex: `.*${req.query.filter || '.*'}.*` } })
            .limit(req.pagination.limit)
            .skip(req.pagination.offset)
            .then(users => res.locals.users = users)
            .then(() => next())
            .catch(next);
    }

    /**
     * Find users middleware
     * @param req
     * @param res
     * @param next
     */
    static countUsers(req, res, next) {

        User
            .countDocuments()
            .then(count => res.locals.usersCount = count)
            .then(() => next())
            .catch(next);
    }

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

    static formatUsers(req, res, next) {
        res.locals.data = res.locals.users.map(r => r.baseFormat());
        res.locals.count = res.locals.usersCount;
        next();
    }
}

module.exports = UsersMiddlewares;
