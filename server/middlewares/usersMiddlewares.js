const { User } = require('../models');

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
}

module.exports = UsersMiddlewares;
