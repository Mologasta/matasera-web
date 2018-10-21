const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class AuthenticateError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.AUTHENTICATE,
            constants.STATUS_CODES.UNAUTHORIZED,
            constants.GENERAL_ERROR_CODE.AUTHENTICATE,
            code,
            message);
    }
}

module.exports = AuthenticateError;