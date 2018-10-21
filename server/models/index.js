"use strict";
const fs = require("fs");
const path = require("path");
const sequelize = require("./../utils/sequelize");
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => fs
        .statSync(path.join(__dirname, file))
        .isDirectory()
    )
    .forEach(modelName => {
        const pathToModel = path.join(__dirname, modelName);
        const model = require(pathToModel);
        db[model.name] = model;
    });

Object
    .keys(db)
    .forEach(modelName => {
        if ("associate" in db[modelName]) {
            db[modelName].associate(db);
        }
    });

module.exports = db;
