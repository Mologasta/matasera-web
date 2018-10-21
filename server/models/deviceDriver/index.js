const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class DeviceDriver extends Sequelize.Model {

}

DeviceDriver.init(schema, options);

module.exports = DeviceDriver;