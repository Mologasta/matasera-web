const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class AdminCard extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            lastFour: this.lastFour,
            type: this.type,
            expMonth: this.expMonth,
            expYear: this.expYear,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

AdminCard.init(schema, options);

module.exports = AdminCard;