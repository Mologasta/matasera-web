const DataTypes = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    rideId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    reason: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    createdAt: {
        type: DataTypes.DATE
    },

    updatedAt: {
        type: DataTypes.DATE
    }
};
