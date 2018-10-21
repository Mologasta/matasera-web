const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class RiderCard extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            lastFour: this.lastFour,
            expMonth: this.expMonth,
            expYear: this.expYear,
            isDefault: this.isDefault,
            type: this.type,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

RiderCard.init(schema, options);

module.exports = RiderCard;