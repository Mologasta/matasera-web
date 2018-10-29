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
     * Get user
     */
    get getUser() {
        return [
            UsersMiddlewares.findUserById,
            CommonMiddlewares.formatUser,
            this.sendResponse()
        ];
    }

    /**
     * Get users list
     */
    get getUsers() {
        return [
            this.pagination,
            UsersMiddlewares.findUsers,
            UsersMiddlewares.countUsers,
            UsersMiddlewares.formatUsers,
            this.sendResponse()
        ];
    }
}

module.exports = UsersController;
