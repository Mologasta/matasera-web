const { UsersMiddlewares, SessionsMiddlewares } = require('../../middlewares');
const { STATUS_CODES } = require('../../constants');
const Controller = require('../../utils/baseController');
const { CommonValidationRules } = require('../../rules');
const bodyValidator = require('../../utils/bodyValidator');


class UsersController extends Controller {
    /**
     * Registration
     */
    get signUp() {
        return [
            bodyValidator([
                CommonValidationRules.mainFields,
                CommonValidationRules.email,
                CommonValidationRules.password()
            ]),
            UsersMiddlewares.createUser,
            SessionsMiddlewares.createSession,
            SessionsMiddlewares.formatSession,
            this.sendResponse(STATUS_CODES.CREATED)
        ];
    }
}

module.exports = UsersController;
