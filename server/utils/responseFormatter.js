const moment = require('moment');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const {STATUS_CODES} = require('../constants');

function retrieveVersion(request, version) {
    if (request.params.version) {
        version = parseInt(request.params.version.replace('v', ''));
    } else {
        version = parseInt(request.url.match(/\d+/));
    }
    return version ? version.toFixed(1) : '0.0';
}

function dropNullFrom(data) {
    if (data instanceof Array) {
        return data.map((data) => typeof data === 'object' ? dropNullFrom(data) : data);
    }

    return Object
        .keys(data)
        .reduce((values, key) => {
            if (data[key] !== null && data[key] !== undefined) {
                values[key] = Object.isExtensible(data[key])
                    ? dropNullFrom(data[key])
                    : data[key];
            }

            return values;
        }, {})
}

module.exports = (req, res, next) => {

    fs.stat(path.resolve(__dirname + '/..' + req.url), (err, stats) => {
        const isFile = stats && stats.isFile();
        //if static file just use next()
        if (!err && isFile) {
            next();
        } else {
            logger.log('info', 'request', {
                headers: req.headers,
                method: req.method,
                url: req.url,
                ip: req.ip
            });
        }
    });

    res.sendResponse = (statusCode, data = {}, pagination = {}, version, dropNull = true) => {
        res
            .status(statusCode)
            .json({
                __v: retrieveVersion(req, version),
                data: dropNull ? dropNullFrom(data) : data,
                pagination: dropNull ? dropNullFrom(pagination) : pagination,
            });
    };

    res.sendError = (err) => {
        let status = err.status || STATUS_CODES.INTERNAL_ERROR;
        if (err.response && err.response.status) {
            status = err.response.status;
        }

        const errors = err.errors || [];
        if (!errors.length) {
            errors.push({
                code: err.generalErrorCode,
                message: err.generalErrorMessage || err.statusText,
            });
        }

        res
            .status(status)
            .json({
                __v: retrieveVersion(req),
                code: err.code,
                message: err.message,
                errors,
            });

        logger.log('error', {
            headers: req.headers,
            url: req.url,
            method: req.method,
            err: err,
            createdAt: moment().unix()
        });

        logger.log('error', err.stack);
    };

    return next();
};
