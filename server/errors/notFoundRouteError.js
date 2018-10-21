const CustomError = require('./../utils/customError');
const constants = require('./../constants');

class NotFoundRouteError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.NOT_FOUND_ERROR,
            constants.STATUS_CODES.NOT_FOUND,
            constants.GENERAL_ERROR_CODE.ROUTE_NOT_FOUND,
            code,
            message);
    }
}

module.exports = NotFoundRouteError;