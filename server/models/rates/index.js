const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class Rate extends Sequelize.Model {
    static associate({ Driver }) {
        this.belongsTo(Driver, {
            foreignKey: 'driverId',
        });
    }
}

Rate.init(schema, options);

module.exports = Rate;