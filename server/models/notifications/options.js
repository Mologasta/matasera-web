const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const models = sequelize.models;
const { Op } = require('sequelize');

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'notifications',
    scopes: {
        byDriver: (userId) => ({
            include: [{
                model: models.NotificationDriver,
                as: 'drivers',
                attributes: [],
                where: {
                    userId,
                }
            }]
        }),

        byRider: (userId) => ({
            include: [{
                model: models.NotificationRider,
                as: 'riders',
                attributes: [],
                where: {
                    userId
                }
            }]
        }),

        withDriver: () => ({
            include: [{
                model: models.Driver,
                as: 'driver',
            }]
        }),

        withRider: () => ({
            include: [{
                model: models.Rider,
                as: 'rider',
            }]
        }),

        byAdmin: (userId) => ({
            include: [{
                model: models.Admin,
                as: 'admins',
                attributes: [],
                where: {
                    id: userId
                }
            }]
        }),

        byIds: (ids) => ({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }),

        unread: () => ({
            where: {
                viewed: false,
            }
        }),

        pagination: ({limit, offset}) => ({limit, offset}),

        order: (order = 'DESC') => ({
            order: [['createdAt', order]]
        }),
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};