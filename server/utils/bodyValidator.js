const Joi = require('joi');
const {validationError} = require('../errors');
const constants = require('./../constants');

/**
 * Validator
 */
class ValidatorHelper {
    static getRequestBody(req) {
        switch (req.method) {
        case 'GET':
        case 'DELETE':
            return req.query || {};
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'SOCKET.IO':
            return req.body || {};
        default :
            return null;
        }
    }

    static setRequestBody(req, data) {
        switch (req.method) {
        case 'GET':
        case 'DELETE':
            req.query = data;
            break;
        case 'POST':
        case 'PUT':
        case 'PATCH':
        case 'SOCKET.IO':
            req.body = data;
            break;
        }
    }

    /**
     * Create validation middleware by schema
     * @param schema
     * @param options
     * @returns {function(*=, *, *)}
     */
    static bodyValidator(schemas, options = {abortEarly: false, convert: true}) {
        return (req, res, next) => {
            let result, data, error, schema, schemaList;

            if (!next && typeof res === 'function') {
                next = res;
            }

            schemaList = schemas.map(schema => typeof schema === 'function'? schema(req.locale): schema);
            schema = Object.assign({}, ...schemaList);

            if (!schema) {
                return next();
            }

            data = ValidatorHelper.getRequestBody(req);
            if (!data) {
                return next(new validationError(
                    constants.ERROR_CODES.VALIDATOR_NOT_SUPPORT_REQUEST,
                    `body-validator does not support ${req.method} requests`
                ));
            }

            result = Joi.validate(data, schema, options);
            if (!result.error) {
                ValidatorHelper.setRequestBody(req, result.value);
                return next();
            }

            error = new validationError();
            error.errors = result.error.details.map(error => ({
                code: constants.ERROR_CODES.VALIDATION_ERROR,
                message: error.message,
                key: error.path
            }));
            return next(error);
        };
    }
}

module.exports = ValidatorHelper.bodyValidator;
