const socket = require('socket.io');
const redis = require('socket.io-redis');
const { USER_ROLES } = require('../constants');

const routes = require('./routes');
const {authenticationHandler, localeHandler} = require('./helpers');
const controllers = require('./controllers');

const messageBroker = require('../utils/messageBroker');

const logger = require('../utils/logger');
const config = require('../../config');

class IOServer {
    constructor(server) {
        const io = this.io = socket.listen(server);
        io.adapter(redis({
            host: config.redis.host,
            port: config.redis.port,
            key: config.redis.key
        }));

        io.use(localeHandler);
        io.use(authenticationHandler);
        io.on('connection', (socket) => this.onConnect(socket));
        this.initBridgeWithApiServer();
    }

    /**
     * Configure event handlers
     * @param socket
     */
    configureEventHandlers(socket) {
        Object
            .keys(routes)
            .forEach(event => {
                const handler = controllers.execute(
                    routes[event],
                    this.io,
                    socket
                );

                socket.on(
                    event,
                    handler
                );
            });
    }

    /**
     * Init message broker
     */
    initBridgeWithApiServer() {
        this.brokerSubscription = messageBroker.subscribe(
            'bridge',
            message => {
                const route = routes[message.event];
                controllers.execute(route, this.io)(message.data);
            }
        );
    }

    /**
     * On connect event handlers
     * @param socket
     */
    onConnect(socket) {
        let user;
        let data = {
            ip: socket.conn.remoteAddress,
            socket: socket.id
        };

        if (socket.user.role === USER_ROLES.RIDER) {
            user = 'rider';
            Object.assign(data, { rider: socket.user.id});
        }

        if (socket.user.role === USER_ROLES.DRIVER) {
            user = 'driver';
            Object.assign(data, { driver: socket.user.id});
        }

        logger.info('Socket was connected:', data);
        this.configureEventHandlers(socket);

        socket.on('disconnect', () => this.onDisconnect(socket));
        socket.join(`${user}:${socket.user.id}`);
        socket.emit('connect');
    }

    /**
     * On disconnect event handlers
     * @param socket
     */
    onDisconnect(socket) {

        let data = {
            ip: socket.conn.remoteAddress,
            socket: socket.id
        };

        if (socket.user.role === USER_ROLES.RIDER) {
            Object.assign(data, { rider: socket.user.id});
        }

        if (socket.user.role === USER_ROLES.DRIVER) {
            Object.assign(data, { driver: socket.user.id});
        }

        logger.info('Socket was disconnected:', data);

        delete socket.user;

        socket.leaveAll();
        socket.disconnect();
    }
}


module.exports = IOServer;