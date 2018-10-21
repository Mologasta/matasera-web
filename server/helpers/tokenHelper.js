const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('./../../config');
const constants = require('./../constants');

const LocalizationDictionary = require('../locale');

const DEFAULT_JWT_LIFETIME = 0;

class TokenHelper {
    /**
     * Create confirm registration token token by user
     * @param user
     * @param payload
     * @param jwtLifeTime
     * @returns {*}
     */
    static createConfirmToken(user, payload = {}, jwtLifeTime = DEFAULT_JWT_LIFETIME) {
        const tokenParams = Object.assign({
            id: user.id,
        }, payload);

        return jwt.sign({
            exp: moment().unix() + jwtLifeTime,
            data: tokenParams
        }, config.jwtKey);
    }

    /**
     * Create token by user
     * @param user
     * @param lifeTime
     * @returns {{token: number, tokenExpireAt: number, refreshToken: number, refreshTokenExpireAt: number}}
     */
    static createTokensPair(user, lifeTime) {
        const tokenParams = {
            id: user.id,
            cacheId: user.cacheId,
            key: uuid.v4(),
            role: user.role
        };
        const refreshParams = Object.assign({isRefreshToken: true}, tokenParams);
        const tokenExpireAt = moment().unix() + (lifeTime || config.jwtLifeTime);
        const refreshTokenExpireAt = moment().unix() + config.jwtRefreshLifeTime;

        const token = jwt.sign({
            exp: tokenExpireAt,
            data: tokenParams
        }, config.jwtKey);

        const refreshToken = jwt.sign({
            exp: refreshTokenExpireAt,
            data: refreshParams
        }, config.jwtKey);

        return {
            token,
            tokenExpireAt: new Date(tokenExpireAt * 1000),
            refreshToken,
            refreshTokenExpireAt: new Date(refreshTokenExpireAt * 1000)
        };
    }

    /**
     * Verify token
     * @param token
     * @param ignoreExpiration
     */
    static decodeToken(token, ignoreExpiration = false) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.jwtKey, {ignoreExpiration}, ((err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            }));
        });
    }

    /**
     * Verify tokens pair
     * @param tokensPair
     * @param tokensPair.token
     * @param tokensPair.refreshToken
     */
    static verifyTokenPair(tokensPair) {
        return Promise
            .all([
                TokenHelper.decodeToken(tokensPair.token, true),
                TokenHelper.decodeToken(tokensPair.refreshToken)
            ])
            .then(([token, refreshToken]) => {
                if (!token.data || !refreshToken.data || !refreshToken.data.isRefreshToken) {
                    throw new Error(LocalizationDictionary.getText('INVALID_TOKENS'));
                }

                if (token.data.id !== refreshToken.data.id || token.data.key !== refreshToken.data.key) {
                    throw new Error(LocalizationDictionary.getText('NO_RELATION_ERROR'));
                }

                return token.data;
            });
    }
}

module.exports = TokenHelper;