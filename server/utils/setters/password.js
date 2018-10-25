'use strict';
const Password = require('../../helpers/passwordHelper');

/**
 * Hash password before create
 * @param that,
 * @param next,
 */
function hashPassword(that, next) {
    that.salt = Password.generateSalt();
    that.password = Password.hash(that.password + that.salt);
    next()
}

/**
 * Hash password before update hook
 * @param model
 */
function beforeUpdate(model) {
    if (model.password && model.changed('password')) {
        model.salt = Password.generateSalt();
        model.password = Password.hash(model.password + model.salt);
    }
}

module.exports = {
    hashPassword,
    beforeUpdate
};
