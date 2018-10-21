const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class ReportDriver extends Sequelize.Model {
}

ReportDriver.init(schema, options);

module.exports = ReportDriver;