const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class DriverFare extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            minimumFare: this.minimumFare,
            ratePerMinute: this.ratePerMinute,
            ratePerMile: this.ratePerMile,
            baseFare :this.baseFare,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

DriverFare.init(schema, options);

module.exports = DriverFare;