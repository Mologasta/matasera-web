const Sequelize = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class ReportRider extends Sequelize.Model {
}

ReportRider.init(schema, options);

module.exports = ReportRider;