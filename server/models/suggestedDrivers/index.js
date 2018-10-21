const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class SuggestedDriver extends Sequelize.Model {
    static associate({ Ride }) {

        this.belongsTo(Ride, {
            foreignKey: 'rideId',
            as: 'ride',
        });
    }
}

SuggestedDriver.init(schema, options);

module.exports = SuggestedDriver;