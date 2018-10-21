const moment = require('moment');

const logger = require('./logger');
const sequelize = require('./sequelize');

const constants = require('../constants');
const {ResponseHelper} = require('../helpers');
const {ForbiddenError} = require('../errors');

const LocalizationDictionary = require('../locale');

const DECIMAL_RADIX = 10;

/**
 * Base Controller class
 */
class BaseController {
    constructor(version) {
        this.VERSION = version;

        this.models = require('../models');
        this.middlewares = require('../middlewares');
        this.constants = constants;
    }

    /**
     * Access by admin role
     * @param roles
     * @returns {function(*, *, *)}
     */
    allowTo(...roles) {
        return (req, res, next) => {
            if (!req.user || !roles.includes(req.user.role)) {
                return next(new ForbiddenError(
                    constants.ERROR_CODES.ACCESS_DENIED,
                    LocalizationDictionary.getText('NOT_HAVE_PERMISSION', req.locale)
                ));
            }

            next();
        };
    }

    /**
     * Pagination middleware
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    pagination(req, res, next) {
        let offset = parseInt(req.query.offset, DECIMAL_RADIX);
        let limit = parseInt(req.query.limit, DECIMAL_RADIX) || constants.PAGINATION.DEFAULT_LIMIT;

        if (limit > constants.PAGINATION.MAX_LIMIT) {
            limit = constants.PAGINATION.MAX_LIMIT;
        }
        if (limit < constants.PAGINATION.MIN_LIMIT) {
            limit = constants.PAGINATION.MIN_LIMIT;
        }

        if (offset && offset < constants.PAGINATION.MIN_OFFSET) {
            offset = constants.PAGINATION.MIN_OFFSET;
        }

        req.query.limit = limit;
        req.pagination = {limit, offset};

        return next();
    }

    /**
     * Execute by condition
     * @param predicate
     * @param middleware
     * @returns {function(*=, *=, *=)}
     */
    when(predicate, middleware) {
        return (req, res, next) => {
            const canActivate = predicate instanceof Function ? predicate(req, res) : predicate;
            if (canActivate) {
                return middleware(req, res, next);
            }

            next();
        };
    }

    /**
     * Send response middleware
     * @param statusCode
     * @returns {function(*=, *)}
     */
    sendResponse(statusCode = constants.STATUS_CODES.OK) {
        return (req, res) => {
            const data = res.locals.data || {};
            let pagination = {};

            logger.log('info', {
                body: req.body,
                url: req.url,
                headers: req.headers,
                method: req.method,
                createdAt: moment().unix(),
            });

            if (data instanceof Array) {
                pagination = ResponseHelper.createPagination(req, res);
            }

            res.sendResponse(statusCode, data, pagination, this.VERSION);
        };
    }

    /**
     * Redirect if error
     * @param address
     * @returns {function(*, *, *, *)}
     */
    static redirect(address, withParams = true) {
        return (err, req, res, next) => {
            const params = res.locals.redirectParams || {};
            if (err) {
                params.error = true;
                params.message = err.generalErrorMessage || err.message;
            } else {
                params.error = false;
            }

            const queryParams = Object
                .keys(params)
                .map(key => `${key}=${params[key]}`)
                .join('&');

            res.redirect(queryParams && withParams ? `${address}?${queryParams}` : address);
        };
    }
}

module.exports = BaseController;
