const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Transfer extends Sequelize.Model {

    static associate({ Rider, Driver, Ride }) {

        this.belongsTo(Rider, {
            foreignKey: 'riderId',
            as: 'rider',
        });

        this.belongsTo(Driver, {
            foreignKey: 'driverId',
            as: 'driver',
        });

        this.belongsTo(Ride, {
            foreignKey: 'rideId',
            as: 'ride',
        });
    }

    baseFormat() {
        return {
            id: this.id,

            ride: this.ride.baseFormat(),
            rider: this.rider.baseFormat(),
            driver: this.driver.baseFormat(),
            chargeId: this.chargeId,
            amount: this.amount,
            fee: this.fee,
            status: this.status,
            isVolunteer: this.isVolunteer,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

Transfer.init(schema, options);

module.exports = Transfer;