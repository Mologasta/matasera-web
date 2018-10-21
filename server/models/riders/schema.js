const DataTypes = require('sequelize');
const { USER_ROLES, USER_STATES } = require('../../constants');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    number: {
        type: DataTypes.INTEGER(16),
        allowNull: false,
        unique: true,
    },

    role: {
        type: DataTypes.INTEGER,
        defaultValue: USER_ROLES.RIDER
    },

    customerId: {
        type: DataTypes.STRING,
    },

    state: {
        type: DataTypes.TINYINT,
        defaultValue: USER_STATES.ACTIVE
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
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

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    salt: {
        type: DataTypes.STRING,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};