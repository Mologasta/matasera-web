'use strict';

/**
 * Timestamp before create hook
 * @param models
 */
function beforeCreate(models) {
    const time = new Date();
    models.createdAt = time;
    models.updatedAt = time;
}

/**
 * Timestamp before update hook
 * @param models
 */
function beforeUpdate(models) {
    models.updatedAt = new Date();
}

/**
 * Timestamp before update hook
 * @param instances
 */
function beforeBulkCreate(instances) {
    const time = new Date();
    instances.forEach(instance => {
        instance.createdAt = time;
        instance.updatedAt = time;
    })
}

/**
 * Timestamp before update hook
 * @param options
 */
function beforeBulkUpdate(options) {
    options.attributes.updatedAt = new Date();
    options.fields.push('updatedAt');
}

module.exports = {beforeCreate, beforeUpdate, beforeBulkCreate, beforeBulkUpdate};