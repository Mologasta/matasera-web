const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    minimumFare: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    ratePerMinute: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    ratePerMile: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    baseFare: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};