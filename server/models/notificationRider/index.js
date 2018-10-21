const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class NotificationRider extends Sequelize.Model {

}

NotificationRider.init(schema, options);

module.exports = NotificationRider;