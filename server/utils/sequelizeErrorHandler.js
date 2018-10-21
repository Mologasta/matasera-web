const constants = require('./../constants');
const customError = require('./customError');

/**
 * Sequelize error handler
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = (err, req, res, next) => {
    if (!err) {
        return next();
    }
    console.error(err);
    if (err && err.name && !(err instanceof customError)) {
        let errorCode;
        if (err.name.slice(0, 9) === 'Sequelize') {
            const parent = err.parent || null;
            errorCode = parent ? parent.code : constants.ERROR_CODES.UNEXPECTED_PARENT_SEQUELIZE;
            errorCode = typeof errorCode === 'string' ? constants.ERROR_CODES.UNEXPECTED_PARENT_SEQUELIZE : +errorCode;
        }
        if (err.errors) {
            const error = new Error();
            error.message = err.generalErrorMessage || err.message;
            error.code = errorCode;
            error.status = constants.STATUS_CODES.BAD_REQUEST;
            error.generalErrorCode = err.generalErrorCode || constants.GENERAL_ERROR_CODE.INTERNAL_ERROR;
            error.generalErrorMessage = err.generalErrorMessage
                || err.message
                || constants.GENERAL_ERROR_MESSAGES.INTERNAL_ERROR;
            error.errors = Object
                .keys(err.errors)
                .map((key) => ({
                    code: constants.ERROR_CODES.VALIDATION_ERROR,
                    message: err.errors[key].message,
                    key: err.errors[key].path || err.errors[key].key
                }));
            return next(error);
        }
        const errorMessage = err.message;
        const error = new Error();
        error.message = errorMessage;
        error.code = err.code || errorCode || constants.ERROR_CODES.UNEXPECTED_GENERAL_SEQUELIZE;
        error.status = err.status || constants.STATUS_CODES.INTERNAL_ERROR;
        error.generalErrorCode = err.generalErrorCode || constants.GENERAL_ERROR_CODE.INTERNAL_ERROR;
        error.generalErrorMessage = err.generalErrorMessage
            || err.message
            || constants.GENERAL_ERROR_MESSAGES.INTERNAL_ERROR;
        return next(error);
    }
    return next(err);
};