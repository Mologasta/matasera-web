const path = require('path');

module.exports = {
    certificate: path.resolve('certificates/apn/dev/dev.cert'),
    key: path.resolve('certificates/apn/dev/dev.pem'),
    topic: 'com.moveapp.app',
    isProduction: false
};