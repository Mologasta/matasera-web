const sequelize = require('../../utils/sequelize');

const timestampHooks = require('../../utils/hooks/timestamp');
const passwordHooks = require('../../utils/hooks/password');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'admins',
    scopes: {
        withCard: () => ({
            include: [
                {
                    model: models.AdminCard,
                    as: 'card'
                }
            ]
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate, passwordHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate, passwordHooks.beforeUpdate]
    }
};