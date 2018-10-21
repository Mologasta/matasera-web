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
        defaultValue: USER_ROLES.DRIVER
    },

    accountId: {
        type: DataTypes.STRING,
    },

    online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    state: {
        type: DataTypes.INTEGER,
        defaultValue: USER_STATES.ACTIVE,
    },

    isVolunteer: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    onRide: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    lastOnlineDate: {
        type: DataTypes.DATE,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    homeAddress: {
        type: DataTypes.STRING,
    },

    photo: {
        type: DataTypes.STRING,
    },

    city: {
        type: DataTypes.STRING,
    },

    verifiedDate: {
        type: DataTypes.DATE,
    },

    standard: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    canDriveChildren: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    drivePassengersWithNeeds: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    needSomeAssistance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    foldingWheelChair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    electricWheelChair: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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