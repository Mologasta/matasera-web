const { AuthenticateError } = require('../errors');
const {LOCALE, ERROR_CODES} = require('../constants');
const { SessionHelper } = require('../helpers');
const LocalizationDictionary = require('../locale');

const logger = require('../utils/logger');

const {RECEIVE_ERROR} = require('./events');

/**
 * Authentication handler
 * @param socket
 * @param next
 * @returns {*}
 */
function authenticationHandler(socket, next) {
    const handshakeData = socket.request;
    const token = handshakeData._query.token;

    if (!handshakeData._query.token) {
        return next(new AuthenticateError(
            ERROR_CODES.UNAUTHORIZED,
            LocalizationDictionary.getText('INVALID_TOKEN', socket.locale)
        ));
    }

    SessionHelper
        .getSession(token)
        .then((user) => {
            socket.user = user;
            next();
        })
        .catch((error) => {
            logger.error('authorization error:', {
                message: error.message,
                stack: error.stack
            });

            next(new AuthenticateError(
                ERROR_CODES.UNAUTHORIZED,
                LocalizationDictionary.getText('INVALID_TOKEN', socket.locale)
            ));
        });
}

/**
 * Set localeHandler
 * @param socket
 * @param next
 * @returns {*}
 */
function localeHandler(socket, next) {
    const handshakeData = socket.request;
    socket.locale = handshakeData._query.locale || LOCALE.DEFAULT_LOCALE;

    next();
}

/**
 * Error handler
 * @param socket
 * @param error
 * @param isDisconnect
 */
function errorHandler(socket, error, isDisconnect) {
    let response;
    const message = error.message || LocalizationDictionary.getText('SOMETHING_WRONG', socket.locale);
    const code = error.code || ERROR_CODES.UNPROCESSABLE;
    const errors = error.errors || [];

    if (!errors.length) {
        errors.push({
            code: error.generalErrorCode,
            message: error.generalErrorMessage
        });
    }

    response = {message, code, errors};

    logger.error('Socket error:', {
        ip: socket && socket.conn && socket.conn.remoteAddress,
        socket: socket && socket.id,
        response,
        stack: error.stack,
    });

    if(socket) {
        return sendError(socket, response, isDisconnect);
    }
}

/**
 * Send error
 * @param socket
 * @param error
 * @param isDisconnect
 */
function sendError(socket, error, isDisconnect) {
    socket.emit(RECEIVE_ERROR, error);

    if (isDisconnect) {
        socket.disconnect();
    }
}

module.exports = {
    authenticationHandler,
    localeHandler,
    errorHandler
};