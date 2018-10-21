const DataTypes = require('sequelize');
const { DEVICE_TYPES } = require('../../constants');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.INTEGER,
        defaultValue: DEVICE_TYPES.IOS,
    },
    sessionKey: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
};