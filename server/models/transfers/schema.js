const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    chargeId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    transferGroup: {
        type: DataTypes.STRING,
    },

    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    isVolunteer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    fee: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    rideId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    riderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};