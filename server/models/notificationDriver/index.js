const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class NotificationDriver extends Sequelize.Model {

}

NotificationDriver.init(schema, options);

module.exports = NotificationDriver;