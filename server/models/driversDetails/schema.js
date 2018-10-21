const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    driversLicenceExpDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    paramedicLicenceExpDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    vehicleRegistrationExpDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    licencePlate: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    numberOfSeats: {
        type: DataTypes.INTEGER,
    },

    placeForLuggage: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    pets: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    babyChair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    smoking: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    taxi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};