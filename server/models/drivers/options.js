const sequelize = require('../../utils/sequelize');
const { Op } = require('sequelize');
const { RIDER_LOOKUP, RIDE_STATES, USER_STATES } = require('../../constants');
const timestampHooks = require('../../utils/hooks/timestamp');
const passwordHooks = require('../../utils/hooks/password');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'drivers',
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

        order: (field = 'createdAt', order = 'DESC') => ({
            order: [[field, order]]
        }),

        withFares: () => ({
            include: [
                {
                    model: models.DriverFare,
                    as: 'driverFare'
                }
            ]
        }),

        withDetails: () => ({
            include: [
                {
                    model: models.DriverDetail,
                    as: 'driverDetail'
                }
            ]
        }),

        withLocation: () => ({
            include: [
                {
                    model: models.DriverLocation,
                    as: 'driverLocation'
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

        withRide: () => ({
            include: [
                {
                    model: models.Ride,
                    as: 'rides',
                    where: {
                        state: {
                            [Op.or]: [
                                RIDE_STATES.SEARCHING,
                                RIDE_STATES.STARTED,
                                RIDE_STATES.ARRIVING,
                                RIDE_STATES.ARRIVED
                            ]
                        },
                    },
                    required: false,
                }
            ]
        }),

        excludeAccepted: () => ({
            where: {
                onRide: false,
            },
        }),

        checkSuggestions: (rideId) => ({
            include: [
                {
                    model: models.SuggestedDriver,
                    as: 'suggested',
                    where: {
                        rideId,
                        status: true,
                    },
                    include: [
                        {
                            model: models.Ride,
                            as: 'ride',
                            where: {
                                state: {
                                    [Op.or]: [
                                        RIDE_STATES.SEARCHING,
                                        RIDE_STATES.STARTED,
                                        RIDE_STATES.ARRIVING,
                                        RIDE_STATES.ARRIVED
                                    ]
                                },
                            }
                        }
                    ]
                }
            ],
        }),

        checkState: () => ({
            where: {
                onRide: true,
            },
        }),

        byIds: (ids) => ({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        }),

        isOnline: () => ({
            where: {
                online : true,
            }
        }),

        driveChildren: () => ({
            where: {
                canDriveChildren : true,
            }
        }),

        helpGettingOut: () => ({
            where: {
                needSomeAssistance : true,
            }
        }),

        foldingWheelchair: () => ({
            where: {
                foldingWheelChair : true,
            }
        }),

        electricWheelchair: () => ({
            where: {
                electricWheelchair : true,
            }
        }),

        advancedMedicalNeeds: () => ({
            where: {
                drivePassengersWithNeeds : true,
            }
        }),

        onlyStandard: () => ({
            where: {
                standard : true,
            }
        }),

        notStandard: () => ({
            where: {
                standard : false,
            }
        }),

        additionalParams: (pets, babyChair, luggage, smoking) => {
            let params = {};

            if (pets) {
                Object.assign(params, {
                    pets: pets,
                });
            }
            if (smoking !== undefined) {
                Object.assign(params, {
                    smoking: smoking,
                });
            }
            if (babyChair) {
                Object.assign(params, {
                    babyChair: babyChair,
                });
            }
            if (luggage) {
                Object.assign(params, {
                    placeForLuggage: luggage,
                });
            }

            return {
                include: [
                    {
                        model: models.DriverDetail,
                        as: 'driverDetail',
                        where: params,
                    }
                ]
            };
        },

        countAvgRate: (driverIds) => ({
            include: [
                {
                    model: models.Rate,
                    as: 'rates',
                    where: {
                        driverId: {
                            [Op.in]: driverIds
                        }
                    },
                    attributes: ['id', [ sequelize.fn('AVG', sequelize.col('rate')), 'rating']]
                }
            ],

            group: [['id'], ['rating']]
        }),

        active: () => ({
            where: {
                state: USER_STATES.ACTIVE
            }
        }),

        byBlocked: () => ({
            where: {
                state: {
                    [Op.in]: [USER_STATES.ON_HOLD, USER_STATES.BLOCKED]
                }
            }
        }),

        inRadius: (lat, long, radius, timeout = RIDER_LOOKUP.TIMEOUT) => ({
            include: [
                {
                    model: models.DriverLocation,
                    as: 'driverLocation',
                    where: sequelize.where(
                        sequelize.fn('getGeoDistance',
                            lat,
                            long,
                            sequelize.col('latitude'),
                            sequelize.col('longitude')), '<=',
                        sequelize.literal(` ${radius} AND ` +
                            '`driverLocation`.`updatedAt` >= DATE_SUB(NOW(), INTERVAL ' +
                            timeout + ' SECOND)')),
                }
            ],
            limit: RIDER_LOOKUP.LIMIT
        })
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate, passwordHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate, passwordHooks.beforeUpdate]
    }
};