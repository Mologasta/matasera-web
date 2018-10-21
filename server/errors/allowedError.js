const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class AllowedError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.ALLOWED,
            constants.STATUS_CODES.NOT_ALLOWED,
            constants.GENERAL_ERROR_CODE.NOT_ALLOWED_ACTION,
            code,
            message);
    }
}

module.exports = AllowedError;