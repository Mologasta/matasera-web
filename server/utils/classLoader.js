const fs = require('fs');
const path = require('path');

const cache = new Map();

function loadClasses(dirname, basename, classes = {}) {
    let result;
    if (cache.has(dirname)) {
        return cache.get(dirname);
    }

    result = fs
        .readdirSync(dirname)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .reduce((result, file) => {
            const pathToModel = path.join(dirname, file);
            const name = file.split('.')[0];
            const _class = require(pathToModel);

            result[_class.name] = result[name] = _class;

            return result;
        }, classes);

    cache.set(dirname, result);

    return result;
}

module.exports = loadClasses;