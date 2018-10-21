'use strict';
const Password = require('../../helpers/passwordHelper');

/**
 * Hash password before create hook
 * @param model
 */
function beforeCreate(model) {
    if (model.password) {
        model.salt = Password.generateSalt();
        model.password = Password.hash(model.password + model.salt);
    }
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
    beforeCreate,
    beforeUpdate
};