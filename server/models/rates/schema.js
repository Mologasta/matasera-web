const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    riderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
};
