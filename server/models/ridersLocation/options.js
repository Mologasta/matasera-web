const sequelize = require('../../utils/sequelize');

const timestampHooks = require('../../utils/hooks/timestamp');

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'ridersLocation',
    scopes: {
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};