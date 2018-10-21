const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class BadRequestError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.BAD_REQUEST_ERROR,
            constants.STATUS_CODES.BAD_REQUEST,
            constants.GENERAL_ERROR_CODE.UNPROCESSABLE,
            code,
            message);
    }
}

module.exports = BadRequestError;