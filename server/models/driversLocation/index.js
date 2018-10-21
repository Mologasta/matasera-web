const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class DriverLocation extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            latitude: this.latitude,
            longitude: this.longitude,
            direction: this.direction,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

DriverLocation.init(schema, options);

module.exports = DriverLocation;