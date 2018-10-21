const Redis = require('../utils/redis');
const config = require('../../config');
const bluebird = require('bluebird');
const { UnprocessableEntityError, AuthenticateError } = require('../errors');
const { ERROR_CODES, TWO_FACTOR } = require('../constants');
const LocalizationDictionary = require('../locale');

const getFromRedis = bluebird.promisify(Redis.get, {
    context: Redis
});
const deleteFromRedis = bluebird.promisify(Redis.del, {
    context: Redis
});

class CodeHelper {
    static generateCode(number) {
        let code;

        return getFromRedis(number)
            .then((value) => {
                const data = JSON.parse(value);
                let validDelay = true;
                if (data && data.dateCreated + config.codeDelay > new Date().getTime()) {
                    validDelay = false;
                }
                if (data && !validDelay) {
                    return Promise.reject(new UnprocessableEntityError(
                        ERROR_CODES.UNPROCESSABLE,
                        LocalizationDictionary.getText('DELAY_ERROR')
                    ));
                }

                return deleteFromRedis(number);
            })
            .then(() => {
                code = Math.random().toString().slice(-TWO_FACTOR.CODE_LENGTH);
                Redis.setex(number, config.codeLifeTime, JSON.stringify({ code, dateCreated: new Date().getTime() }));
                return {number, code};
            });
    }

    static verifyCode(number, code) {
        return getFromRedis(number)
            .then(value => {
                const data = JSON.parse(value);

                if (!data || data.code !== code) {
                    return Promise.reject(new AuthenticateError(
                        ERROR_CODES.UNAUTHORIZED,
                        LocalizationDictionary.getText('INVALID_CODE')
                    ));
                }
            });
    }
}

module.exports = CodeHelper;