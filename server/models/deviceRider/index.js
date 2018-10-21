const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class DeviceRider extends Sequelize.Model {}

DeviceRider.init(schema, options);

module.exports = DeviceRider;