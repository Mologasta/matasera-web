const { UsersMiddlewares, CommonMiddlewares, SessionsMiddlewares, } = require('../../middlewares');
const Controller = require('../../utils/baseController');
const { CommonValidationRules, SessionValidationRules } = require('../../rules');
const bodyValidator = require('../../utils/bodyValidator');


class SessionsController extends Controller {
    /**
     * Create session
     */
    get signIn() {
        return [
            bodyValidator([CommonValidationRules.email(), CommonValidationRules.loginPassword]),
            UsersMiddlewares.getUserByEmail,
            CommonMiddlewares.checkPassword,
            SessionsMiddlewares.createSession,
            SessionsMiddlewares.formatSession,
            this.sendResponse()
        ];
    }

    /**
     * Delete session
     */
    get signOut() {
        return [
            SessionsMiddlewares.destroySession,
            this.sendResponse()
        ];
    }

    /**
     * Refresh session
     */
    get refresh() {
        return [
            bodyValidator([SessionValidationRules.refreshToken]),
            SessionsMiddlewares.verifySession,
            SessionsMiddlewares.destroySession,
            UsersMiddlewares.findUserById,
            SessionsMiddlewares.createSession,
            SessionsMiddlewares.formatSession,
            this.sendResponse()
        ];
    }
}

module.exports = SessionsController;
