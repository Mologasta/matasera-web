const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Notification extends Sequelize.Model {

    static associate({ NotificationRider, Rider,  NotificationDriver, Driver }) {

        this.hasMany(NotificationRider, {
            foreignKey: 'notificationId',
            as: 'riders',
        });

        this.belongsToMany(Rider, {
            through: NotificationRider,
            foreignKey: 'notificationId',
            otherKey: 'userId',
            as: 'rider',
        });

        this.hasMany(NotificationDriver, {
            foreignKey: 'notificationId',
            as: 'drivers'
        });

        this.belongsToMany(Driver, {
            through: NotificationDriver,
            foreignKey: 'notificationId',
            otherKey: 'userId',
            as: 'driver',
        });
    }

    baseFormat() {
        return {
            id: this.id,

            message: this.message,
            title: this.title,
            type: this.type,
            viewed: this.viewed,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

Notification.init(schema, options);

module.exports = Notification;