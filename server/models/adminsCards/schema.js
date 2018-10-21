const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    lastFour: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cardId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    expMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    expYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};