/**
 * Custom error class
 */
class CustomError extends Error {
    constructor(generalErrorMessage, status, generalErrorCode, code, message) {
        super(generalErrorMessage);
        this.status = status;
        this.code = generalErrorCode;
        this.generalErrorCode = code;
        this.generalErrorMessage = message;
    }
}

module.exports = CustomError;