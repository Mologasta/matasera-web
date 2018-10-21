const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const { RIDE_STATES } = require('../../constants');
const { Op } = require('sequelize');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'suggestedDrivers',
    scopes: {
        byDriver: (rideId, driverId) => ({
            where: {
                driverId,
                rideId,
            }
        }),

        byIds: (Ids) => ({
            where: {
                id: {
                    [Op.in]: Ids
                }
            }
        }),

        suggested: (driverId) => ({
            include: [{
                model: models.Ride.scope('withRider'),
                as: 'ride',
                where: {
                    state: RIDE_STATES.SEARCHING,
                }
            }],
            where: {
                driverId,
                status: false,
            }
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};