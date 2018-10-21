const path = require('path');
const classLoader = require('../../utils/classLoader');

module.exports = classLoader(__dirname, path.basename(module.filename));