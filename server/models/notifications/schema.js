const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    viewed: {
        type: DataTypes.BOOLEAN,
    },

    type: {
        type: DataTypes.INTEGER,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};