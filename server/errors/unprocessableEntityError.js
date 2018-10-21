const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class UnprocessableEntityError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.UNPROCESSABLE,
            constants.STATUS_CODES.UNPROCESSABLE_ENTITY,
            constants.GENERAL_ERROR_CODE.UNPROCESSABLE,
            code,
            message);
    }
}

module.exports = UnprocessableEntityError;