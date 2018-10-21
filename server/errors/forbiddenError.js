const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class ForbiddenError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.FORBIDDEN,
            constants.STATUS_CODES.FORBIDDEN,
            constants.GENERAL_ERROR_CODE.FORBIDDEN,
            code,
            message);
    }
}

module.exports = ForbiddenError;