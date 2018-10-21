const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class InternalError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.INTERNAL_ERROR,
            constants.STATUS_CODES.INTERNAL_ERROR,
            constants.GENERAL_ERROR_CODE.INTERNAL_ERROR,
            code,
            message);
    }
}

module.exports = InternalError;