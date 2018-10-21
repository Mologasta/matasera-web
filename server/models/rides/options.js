const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const stateHooks = require('../../utils/hooks/state');
const { RIDE_STATES, SMOKING_PREFERENCES } = require('../../constants');
const { Op } = require('sequelize');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'rides',
    scopes: {
        pagination: ({limit, offset}) => ({limit, offset}),
        checkRidesByRider: (riderId) => ({
            where: {
                riderId,
                state: {
                    [Op.or]: [
                        RIDE_STATES.SEARCHING,
                        RIDE_STATES.STARTED,
                        RIDE_STATES.ARRIVING,
                        RIDE_STATES.ARRIVED
                    ]
                }
            }
        }),

        byDriver: (driverId) => ({
            where: {
                driverId,
            }
        }),

        order: () => ({
            order: [['createdAt', 'DESC']]
        }),

        byStates: (states) => ({
            where: {
                state: {
                    [Op.in]: states
                }
            }
        }),

        byDriverDetails: ({ pets, babyChair, placeForLuggage }) => ({
            where: {
                pets: {
                    [Op.in]: pets ? [true, false] : [false]
                },
                babyChair: {
                    [Op.in]: babyChair ? [true, false] : [false]
                },
                luggage: {
                    [Op.in]: placeForLuggage ? [true, false] : [false]
                },
            }
        }),

        byIds: (ids) => ({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }),

        options: (options, smoking) => {
            let isAdult = {};

            if (options.isAdult) {
                isAdult = {isAdult: {[Op.in]: options.isAdult}};
            }
            if (smoking) {
                options.smokingPreference = [SMOKING_PREFERENCES.SMOKING, SMOKING_PREFERENCES.NO_CHOICE];
            }

            if (!smoking) {
                options.smokingPreference = [SMOKING_PREFERENCES.NO_SMOKING, SMOKING_PREFERENCES.NO_CHOICE];
            }

            return {
                include: [{
                    model: models.Rider,
                    as: 'rider',
                    where: Object.assign({
                        characteristics: {
                            [Op.or]: {
                                [Op.in]: options.characteristics,
                                [Op.is]: null,
                            }
                        },
                        smokingPreference: {
                            [Op.in]: options.smokingPreference
                        }
                    }, isAdult)
                }]
            };
        },

        inRadius: (lat, long, radius) => ({
            attributes: [
                [sequelize.fn('getGeoDistance',
                    lat,
                    long,
                    sequelize.col('startLat'),
                    sequelize.col('startLong')), 'distance']
            ].concat(Object.keys(models.Ride.attributes)),
            having: {
                distance: {
                    [Op.lte]: radius,
                    [Op.not]: null,
                }
            }
        }),

        withSuggestions: () => ({
            include: [
                {
                    model: models.Driver,
                    as: 'suggestedDrivers'
                }
            ]
        }),


        withDriver: () => ({
            include: [
                {
                    model: models.Driver.scope('withDetails'),
                    as: 'driver'
                }
            ]
        }),

        withRider: () => ({
            include: [
                {
                    model: models.Rider,
                    as: 'rider'
                }
            ]
        }),

        withCard: () => ({
            include: [
                {
                    model: models.RiderCard,
                    as: 'card'
                }
            ]
        }),

        suggestedList: () => ({
            include: [
                {
                    model: models.SuggestedDriver,
                    as: 'drivers'
                }
            ]
        }),

        ongoingRides: (riderId) => ({
            where: {
                riderId,
                state: {
                    [Op.or]: [
                        RIDE_STATES.SEARCHING,
                        RIDE_STATES.ARRIVING,
                        RIDE_STATES.ARRIVED
                    ]
                }
            }
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate, stateHooks.beforeUpdate]
    }
};