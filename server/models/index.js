const mongose = require('mongoose');
const client = require('../utils/mongo');
const fs = require("fs");
const path = require("path");
const models = {};

fs
    .readdirSync(__dirname)
    .filter(file => fs
        .statSync(path.join(__dirname, file))
        .isDirectory()
    )
    .forEach(obj => {
        const pathToModel = path.join(__dirname, obj);
        const model = require(pathToModel);
        const schema = new mongose.Schema(model.schema);
        models[model.name] = mongose.model(model.name, schema)
    });
module.exports = models;
