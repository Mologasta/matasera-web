const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'debt',
    scopes: {
        withTransfer: () => ({
            include: [
                {
                    model: models.Transfer.scope('withDriver'),
                    as: 'transfer',
                }
            ]
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};