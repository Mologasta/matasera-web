const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');


module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'reports',
    scopes: {
        checkIfReported: (rideId) => ({
            where: {
                rideId,
            }
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};