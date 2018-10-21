const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'transfers',
    scopes: {
        withDriver: () => ({
            include: [
                {
                    model: models.Driver,
                    as: 'driver'
                }
            ]
        }),
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};