const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class RiderFee extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            cancellationFee: this.cancellationFee,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

RiderFee.init(schema, options);

module.exports = RiderFee;