const DataTypes = require('sequelize');
const { USER_ROLES } = require('../../constants');

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

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    customerId: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.INTEGER,
        defaultValue: USER_ROLES.ADMIN
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    salt: {
        type: DataTypes.STRING,
    },

    lastPasswordUpdate: {
        type: DataTypes.DATE
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};