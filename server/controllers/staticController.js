const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const async = require('async');

const config = require('../../config');

function swaggerConfig(req, res, next) {
    const base = require('./../../frontend/swagger/api.json');
    const apiDir = path.resolve(__dirname + '/../../frontend/swagger/api');
    const parts = fs.readdirSync(apiDir);

    async.each(parts, (filename, cb) => {
        const part = require(apiDir + '/' + filename);

        base.tags = base.tags.concat(part.tags);
        base.paths = _.extend(base.paths, part.paths);
        base.definitions = _.extend(base.definitions, part.definitions);
        cb();
    }, () => res.send(base));
}

module.exports = {
    swaggerConfig: swaggerConfig
};
