const async = require("async");
const fs = require("fs");
const path = require("path");

const {errorHandler} = require("../helpers");

const {InternalError} = require("../../errors");
const {ERROR_CODES, LOCALE} = require("../../constants");
const logger = require("../../utils/logger");

const LocalizationDictionary = require('../../locale');

class ControllerManager {
    constructor() {
        this.controllers = {};

        fs
            .readdirSync(__dirname)
            .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('index') === -1) && (file.slice(-3) === '.js'))
            .forEach(file => {
                const pathToModule = path.join(__dirname, file);
                const Module = require(pathToModule);
                const moduleName = file.split('Controller')[0];
                this.controllers[moduleName] = new Module();
            });
    }

    /**
     * calls specified method of handler
     * @param route
     * @param io
     * @param socket
     * @returns {Function}
     */
    execute(route, io, socket) {
        return (data) => {
            let action, operations, context;

            const controllerName = route.split('.')[0];
            const actionName = route.split('.')[1];
            const controller = this.controllers[controllerName];

            logger.info(`Route: ${route}`, {
                socket: socket && socket.id,
                user: socket && socket.user && socket.user.id,
                data
            });

            if (!controller || !controller[actionName]) {
                return errorHandler(
                    socket,
                    new InternalError(
                        ERROR_CODES.INTERNAL_ERROR,
                        LocalizationDictionary.getText('EVENT_NOT_IMPLEMENTED', socket.locale)
                    )
                );
            }

            context = {
                socket,
                io,
                body: data,
                user: socket && socket.user,
                locale: socket && socket.locale || LOCALE.DEFAULT_LOCALE,
                locals: {},
                method: 'SOCKET.IO'
            };
            action = controller[actionName];
            operations = action instanceof Array ? action : [action];
            operations = operations.map(middleware => middleware.bind(controller, context));

            async.series(operations, error => {
                if (error) {
                    errorHandler(socket, error);
                }
            });
        }
    }
}

module.exports = new ControllerManager();