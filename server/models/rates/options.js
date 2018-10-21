const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const { Op } = require('sequelize');

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'rates',
    scopes: {
        checkIfRated: (riderId, rideId) => ({
            where: {
                riderId,
                rideId
            }
        }),

        byDriver: (driverId) => ({
            where: {
                driverId,
            }
        }),

        countAvgRateByIds: (driverIds) => ({
            attributes: ['driverId',[ sequelize.fn('AVG', sequelize.col('rate')), 'rating']],
            where: {
                driverId: {
                    [Op.in]: driverIds
                }
            },
            group: ['driverId'],
        }),

        countAvgRate: () => ({
            attributes: [[ sequelize.fn('AVG', sequelize.col('rate')), 'rating']]
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};