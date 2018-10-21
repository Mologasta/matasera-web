const bluebird = require('bluebird');

const config = require('./../../config');
const Redis = require('./../utils/redis');
const TokenHelper = require('./tokenHelper');

const LocalizationDictionary = require('../locale');

const setToRedis = bluebird.promisify(Redis.set, {
    context: Redis
});
const getFromRedis = bluebird.promisify(Redis.get, {
    context: Redis
});
const deleteFromRedis = bluebird.promisify(Redis.del, {
    context: Redis
});

class SessionHelper {
    /**
     * Create session
     * @param user
     * @param lifeTime
     * @returns {*}
     */
    static createSession(user, lifeTime) {
        let tokenPair;
        if (!user) {
            return Promise.reject(new Error(LocalizationDictionary.getText('EXPECT_USER')));
        }

        tokenPair = TokenHelper.createTokensPair(user, lifeTime);
        Redis.setex(tokenPair.token, config.jwtRefreshLifeTime, JSON.stringify(user));
        return SessionHelper
            .addTokenToSessionList(user.cacheId, tokenPair.token)
            .then(() => tokenPair);
    }

    /**
     * Verify token pair
     * @param tokensPair
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
    
    /**
     * Get user/admin session data
     * @param {*} token 
     */
    static getSession(token) {
        return getFromRedis(token)
            .then(result => {
                if (!result) {
                    throw new Error(LocalizationDictionary.getText('INVALID_SESSION'));
                }

                return TokenHelper
                    .decodeToken(token)
                    .then(decodedToken => Object.assign(JSON.parse(result), {
                        sessionKey: decodedToken.data.key
                    }));
            });
    }

    /**
     * Verify tokens pair
     * @param token
     */
    static verifySession(token = '') {
        return getFromRedis(token)
            .then(result => {
                if (!result) {
                    throw new Error(LocalizationDictionary.getText('INVALID_SESSION'));
                }

                return TokenHelper.decodeToken(token, true);
            })
            .then(token => token.data);
    }

    /**
     * Remove token
     * @param token
     */
    static destroySession(token = '') {
        return deleteFromRedis(token);
    }

    /**
     * Remove token
     * @param userId
     */
    static destroyAllSession(userId) {
        return SessionHelper
            .getStoredTokens(userId)
            .map((token) => deleteFromRedis(token))
            .then(() => deleteFromRedis(userId));
    }

    /**
     * Add token to redis session list
     * @param userId
     * @param token
     */
    static addTokenToSessionList(userId, token) {
        return getFromRedis(userId)
            .then(tokens => {
                tokens = tokens ? JSON.parse(tokens) : [];
                tokens.push(token);

                return setToRedis(userId, JSON.stringify(tokens))
                    .then(() => tokens);
            });
    }

    /**
     * Add token to redis session list
     * @param userId
     * @param invalidToken
     */
    static dropTokenFromSessionList(userId, invalidToken) {
        return getFromRedis(userId)
            .then(tokens => {
                tokens = tokens ? JSON.parse(tokens) : [];
                tokens = tokens.filter(token => token !== invalidToken);

                return setToRedis(userId, JSON.stringify(tokens))
                    .then(() => tokens);
            });
    }

    /**
     * Get all user tokens form redis
     * @param userId
     */
    static getStoredTokens(userId) {
        return getFromRedis(userId).then(tokens => tokens ? JSON.parse(tokens) : []);
    }

    /**
     * Update all sessions cache
     * @param {*} user 
     */
    static updateAllCache(user) {
        return SessionHelper
            .getStoredTokens(user.cacheId)
            .map(token => SessionHelper.updateCache(token, user));
    }

    /**
     * Update one session cache (if exist)
     * @param {*} token 
     * @param {*} data 
     */
    static updateCache(token, data) {
        return getFromRedis(token)
            .then(oldData => oldData && setToRedis(token, JSON.stringify(data)));
    }
}

module.exports = SessionHelper;