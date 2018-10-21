const sequelize = require('../../utils/sequelize');
const { Op } = require('sequelize');
const { RIDE_STATES, USER_STATES, RIDER_CHARACTERISTICS } = require('../../constants');
const timestampHooks = require('../../utils/hooks/timestamp');
const passwordHooks = require('../../utils/hooks/password');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'riders',
    scopes: {
        pagination: ({limit, offset}) => ({limit, offset}),

        verified: (isVerified = false) => ({
            where: {
                isVerified,
            }
        }),

        filtration: (filter = '') => ({
            where: {
                $or: {
                    firstName: {
                        [Op.like]: `%${filter}%`
                    },
                    lastName: {
                        [Op.like]: `%${filter}%`
                    },
                    number: {
                        [Op.like]: `%${filter}%`
                    },
                    email: {
                        [Op.like]: `%${filter}%`
                    }
                }
            }
        }),

        active: () => ({
            where: {
                state: USER_STATES.ACTIVE
            }
        }),

        byPreference: (characteristics) => ({
            where: {
                characteristics,
            }
        }),

        byBlocked: () => ({
            where: {
                state: {
                    [Op.in]: [USER_STATES.ON_HOLD, USER_STATES.BLOCKED]
                }
            }
        }),

        withLocation: () => ({
            include: [
                {
                    model: models.RiderLocation,
                    as: 'riderLocation'
                }
            ]
        }),

        withUpdateRequest: () => ({
            include: [
                {
                    model: models.UpdateRequest,
                    as: 'updateRequest',
                    required: false
                }
            ]
        }),

        withDevices: () => ({
            include: [
                {
                    model: models.Device,
                    as: 'devices',
                    required: false
                }
            ]
        }),

        withDebt: () => ({
            include: [
                {
                    model: models.Debt.scope('withTransfer'),
                    as: 'debt',
                    required: false
                }
            ]
        }),

        withRide: () => ({
            include: [
                {
                    model: models.Ride.scope('withDriver'),
                    as: 'ride',
                    where: {
                        state: {
                            [Op.or]: [
                                RIDE_STATES.SEARCHING,
                                RIDE_STATES.STARTED,
                                RIDE_STATES.ARRIVING,
                                RIDE_STATES.ARRIVED
                            ]
                        }
                    },
                    required: false,
                }
            ]
        }),

        withCards: () => ({
            include: [
                {
                    model: models.RiderCard,
                    as: 'cards'
                }
            ]
        }),

        byId: (id) => ({
            where: {
                id,
            }
        }),

        order: (field = 'createdAt', order = 'DESC') => ({
            order: [[field, order]]
        }),
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate, passwordHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate, passwordHooks.beforeUpdate]
    }
};