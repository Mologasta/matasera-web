const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class Email extends Sequelize.Model {
}

Email.init(schema, options);

module.exports = Email;