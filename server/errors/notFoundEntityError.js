const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class NotFoundEntityError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.DATABASE_ENTITY_ERROR,
            constants.STATUS_CODES.NOT_FOUND,
            constants.GENERAL_ERROR_CODE.NOT_FOUND_ENTITY,
            code,
            message);
    }
}

module.exports = NotFoundEntityError;