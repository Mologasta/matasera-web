
const async = require('async');

const staticController = require('./staticController');
const {allowedError, internalError} = require('./../errors');
const constants = require('../constants');
const BaseManager = require('../utils/baseManager');

const LocalizationDictionary = require('../locale');

class ControllerManager extends BaseManager {
    constructor(versions, currentPath, modulePart) {
        super(versions, currentPath, modulePart);
        this.versions = versions || {};
    }

    getComponent(path, param) {
        const Component = require(path);
        return new Component(param);
    }

    get staticFiles() {
        return staticController;
    }

    /**
     * Configure route
     * @param route
     * @returns {function(*=, *=, *=)}
     */
    execute(route) {
        return (req, res, next) => {
            let error, controllerName, controller, actionName, action, operations;
            const version = req.params.version || 'v1';
            const controllers = this.versions[version];

            if (!controllers) {
                error = new allowedError(
                    constants.ERROR_CODES.UNSUPPORTED_API,
                    LocalizationDictionary.getText('API_NOT_SUPPORTED', req.locale)
                );
                return next(error);
            }

            controllerName = route.split('.')[0];
            actionName = route.split('.')[1];
            controller = controllers[controllerName];

            if (!controller || !controller[actionName]) {
                return next(new allowedError(
                    constants.ERROR_CODES.NOT_ALLOWED_METHOD,
                    LocalizationDictionary.getText('METHOD_NOT_ALLOWED', req.locale)
                ));
            }

            action = controller[actionName];

            try {
                operations = Array.isArray(action) ? action : [action];
                operations = operations.map((middleware) => {
                    if (!middleware) {
                        throw new allowedError(
                            constants.ERROR_CODES.NOT_IMPLEMENTED,
                            LocalizationDictionary.getText('METHOD_NOT_IMPLEMENTED', req.locale)
                        );
                    }

                    const wrapper = (req, res, next) => {
                        try {
                            middleware.call(this.versions[version][controller], req, res, next);
                        } catch (error) {
                            next(error);
                        }
                    };

                    return wrapper.bind(null, req, res);
                });
            } catch (error) {
                return next(new internalError(
                    constants.ERROR_CODES.INTERNAL_ERROR,
                    LocalizationDictionary.getText('METHOD_NOT_ALLOWED', req.locale)
                ));
            }

            async.series(operations, next);
        };
    }
}

module.exports = new ControllerManager({}, __dirname, 'Controller');
