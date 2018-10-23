const { UsersMiddlewares, CommonMiddlewares, SessionsMiddlewares } = require('../../middlewares');
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
                CommonValidationRules.email,
                CommonValidationRules.mainFields,
                CommonValidationRules.password()
            ]),
            UsersMiddlewares.createUser,
            SessionsMiddlewares.createSession,
            SessionsMiddlewares.formatSession,
            this.sendResponse(STATUS_CODES.CREATED)
        ];
    }

    /**
     * Update password
     */
    get updatePassword() {
        return [
            bodyValidator([CommonValidationRules.password()]),
            UsersMiddlewares.getUserByNumber,
            CommonMiddlewares.updatePassword,
            this.sendResponse()
        ];
    }

    /**
     * Get rider
     */
    get getUser() {
        return [
            CommonMiddlewares.checkAccess,
            UsersMiddlewares.findUserById,
            CommonMiddlewares.formatUser,
            this.sendResponse()
        ];
    }
}

module.exports = UsersController;
