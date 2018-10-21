const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const { Op } = require('sequelize');
const models = sequelize.models;

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'devices',
    scopes: {
        byDriver: (userId) => ({
            include: [{
                model: models.Driver,
                as: 'drivers',
                attributes: [],
                where: {
                    id: userId
                }
            }]
        }),

        byRider: (userId) => ({
            include: [{
                model: models.Rider,
                as: 'riders',
                attributes: [],
                where: {
                    id: userId
                }
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
                    [Op.in]: ids,
                }
            }
        }),
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};