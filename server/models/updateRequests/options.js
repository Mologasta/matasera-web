const sequelize = require('../../utils/sequelize');
const timestampHooks = require('../../utils/hooks/timestamp');
const models = sequelize.models;
const { Op } = require('sequelize');

module.exports = {
    sequelize,
    timestamps: false,
    tableName: 'updateRequests',
    scopes: {
        pagination: ({limit, offset}) => ({limit, offset}),

        filtration: (filter = '') => ({
            include: [{
                model: models.Rider,
                as: 'rider',
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
            }],
        }),

        order: (order = 'DESC') => ({
            order: [['createdAt', order]]
        }),

        withRider: () => ({
            include: [
                {
                    model: models.Rider,
                    as: 'rider'
                }
            ]
        }),
    },
    hooks: {
        beforeCreate: [timestampHooks.beforeCreate],
        beforeUpdate: [timestampHooks.beforeUpdate]
    }
};