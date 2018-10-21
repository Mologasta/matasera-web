const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    cardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    riderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    driverId: {
        type: DataTypes.INTEGER,
    },

    startLat: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    startLong: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },

    startTime: {
        type: DataTypes.DATE,
    },

    startLocation: {
        type: DataTypes.STRING,
    },

    price: {
        type: DataTypes.INTEGER,
    },

    donation: {
        type: DataTypes.BOOLEAN,
    },

    pets: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    babyChair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    luggage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    duration: {
        type: DataTypes.INTEGER,
    },

    distance: {
        type: DataTypes.INTEGER,
    },

    endLat: {
        type: DataTypes.DOUBLE,
    },

    endLong: {
        type: DataTypes.DOUBLE,
    },

    endTime: {
        type: DataTypes.DATE,
    },

    destinationLocation: {
        type: DataTypes.STRING,
    },

    state: {
        type: DataTypes.INTEGER,
    },

    comment: {
        type: DataTypes.STRING,
    },

    stateChangeDate: {
        type: DataTypes.DATE,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};