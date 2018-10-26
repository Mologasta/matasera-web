const { SessionHelper } = require('../helpers');
const { UnprocessableEntityError, NotFoundEntityError, AuthenticateError } = require('../errors');
const { ERROR_CODES, USER_STATES } = require('../constants');

const LocalizationDictionary = require('../locale');

class SessionsMiddlewares {
    /**
     * Create user session middleware
     * @param req
     * @param res
     * @param next
     */
    static createSession(req, res, next) {
        const user = res.locals.user || req.user;

        if(!user) {
            return next(new NotFoundEntityError(
                ERROR_CODES.ENTITY_NOT_FOUND,
                LocalizationDictionary.getText('USER_NOT_FOUND', req.locale)
            ));
        }

        SessionHelper
            .createSession(user, req.body.lifeTime)
            .then(tokenPair => res.locals.tokenPair = tokenPair)
            .then(() => next())
            .catch(() => next(new UnprocessableEntityError(
                ERROR_CODES.INTERNAL_ERROR,
                LocalizationDictionary.getText('SOMETHING_WRONG', req.locale)
            )));
    }

    /**
     * Refresh session middleware
     * @param req
     * @param res
     * @param next
     */
    static verifySession(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const refreshToken = req.body.refreshToken;

        SessionHelper
            .verifyTokenPair({token, refreshToken})
            .then(tokenPair => res.locals.userId = tokenPair.id)
            .then(() => next())
            .catch(() => next(new AuthenticateError(
                ERROR_CODES.UNAUTHORIZED,
                LocalizationDictionary.getText('INVALID_TOKENS', req.locale)
            )));
    }

    /**
     * Destroy session middleware
     * @param req
     * @param res
     * @param next
     */
    static destroySession(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        SessionHelper
            .verifySession(token)
            .then((payload) => SessionHelper.dropTokenFromSessionList(payload.cacheId, token))
            .then(() => SessionHelper.destroySession(token))
            .then(() => next())
            .catch(() => next(new UnprocessableEntityError(
                ERROR_CODES.INTERNAL_ERROR,
                LocalizationDictionary.getText('INVALID_TOKEN', req.locale)
            )));
    }

    /**
     * Destroy user sessions
     */
    static destroyAllUserSessions (req, res, next) {
        const user = res.locals.user;

        if(user.state === USER_STATES.ON_HOLD) {
            return next();
        }

        SessionHelper
            .destroyAllSession(user.cacheId)
            .then(() => next())
            .catch(next);
    }

    /**
     * Format session
     * @param req
     * @param res
     * @param next
     */
    static formatSession(req, res, next) {
        res.locals.data = res.locals.user.sessionFormat(res.locals.tokenPair);
        next();
    }
}

module.exports = SessionsMiddlewares;
