const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    riderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    isAdult: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

    characteristics: {
        type: DataTypes.INTEGER,
    },

    smokingPreference: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ridePreference: {
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