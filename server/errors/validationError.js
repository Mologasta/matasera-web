const CustomError = require('./../utils/customError');
const constants = require('./../constants');
const sequelize = require('sequelize');

class ValidationError extends CustomError {
    constructor(code, message) {
        super(constants.GENERAL_ERROR_MESSAGES.VALIDATOR_ERROR,
            constants.STATUS_CODES.BAD_REQUEST,
            constants.GENERAL_ERROR_CODE.VALIDATOR_ERROR,
            code,
            message);
    }

    /**
     * Map error messages
     * @param messages
     * @param errorClass
     * @returns {function(*)}
     */
    static mapSequelizeValidationError(messages = {}, errorClass = sequelize.ValidationError, errorCode = constants.ERROR_CODES.VALIDATION_ORM_ERROR) {
        return (error) => {
            if (error instanceof errorClass) {
                const err = new ValidationError();
                err.errors = Object
                    .keys(error.errors)
                    .map(key => {
                        const fileld = error.errors[key].path || error.errors[key].key || key;
                        return {
                            code: errorCode,
                            message: messages[fileld] || error.errors[key].message,
                            key: fileld
                        };
                    });

                throw err;
            }

            throw error;
        };
    }

    static mapSequelizeForeignKeyError(messages, code = constants.ERROR_CODES.VALIDATION_NOT_FOUND_ERROR) {
        return (error) => {
            if (error instanceof sequelize.ForeignKeyConstraintError) {
                const err = new ValidationError();
                err.errors = error.fields
                    .map(key => {
                        return {
                            code,
                            message: messages[key] || error.message,
                            key: key
                        };
                    });
                throw err;
            }

            throw error;
        };
    }
}

module.exports = ValidationError;