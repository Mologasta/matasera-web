'use strict';
const Password = require('../../helpers/passwordHelper');

/**
 * Hash password before create
 * @param value
 */
function hashPassword(value) {
        const salt = Password.generateSalt();
        return  Password.hash(value + salt);
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
