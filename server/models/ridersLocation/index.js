const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class RiderLocation extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            latitude: this.latitude,
            longitude: this.longitude,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

RiderLocation.init(schema, options);

module.exports = RiderLocation;