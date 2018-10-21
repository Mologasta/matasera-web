const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Ride extends Sequelize.Model {

    static associate({ Rider, Driver, Report, SuggestedDriver, RiderCard }) {

        this.belongsTo(Rider, {
            foreignKey: 'riderId',
            as: 'rider',
        });

        this.belongsTo(Driver, {
            foreignKey: 'driverId',
            as: 'driver',
        });

        this.hasOne(Report, {
            foreignKey: 'rideId',
            as: 'report',
        });

        this.belongsTo(RiderCard, {
            foreignKey: 'cardId',
            as: 'card',
        });

        this.hasMany(SuggestedDriver, {
            foreignKey: 'rideId',
            as: 'drivers',
        });

        this.belongsToMany(Driver, {
            through: SuggestedDriver,
            foreignKey: 'rideId',
            otherKey: 'driverId',
            as: 'suggestedDrivers',
        });
    }

    baseFormat() {
        return {
            id: this.id,

            startLat: this.startLat,
            startLong: this.startLong,
            startTime: this.startTime && this.startTime.toISOString(),
            startLocation: this.startLocation,

            price: this.price,
            donation: this.donation,
            duration: this.duration,
            distance: this.distance,
            endLat: this.endLat,
            endLong: this.endLong,
            endTime: this.endTime && this.endTime.toISOString(),
            destinationLocation: this.destinationLocation,
            state: this.state,
            comment: this.comment,

            rider: this.rider && this.rider.baseFormat(),
            driver: this.driver && this.driver.baseFormat(),
            suggestedDrivers: this.suggestedDrivers && this.suggestedDrivers.map(s => s.baseFormat()),

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

Ride.init(schema, options);

module.exports = Ride;