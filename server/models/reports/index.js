const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class Report extends Sequelize.Model {
    static associate({ Ride }) {
        this.belongsTo(Ride, {
            foreignKey: 'rideId',
            as: 'ride'
        });
    }

    baseFormat() {
        return {
            id: this.id,

            reason: this.reason,
            comment: this.comment,
            ride: this.ride && this.ride.baseFormat(),

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

Report.init(schema, options);

module.exports = Report;