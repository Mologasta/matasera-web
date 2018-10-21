const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    cancellationFee: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};