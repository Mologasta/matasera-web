const http = require('http');
const app = require('./server');
const logger = require('./server/utils/logger');
const config = require('./config');

const PORT = config.server.port;

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Web server successfully started at ${PORT}`);
});

module.exports = {
    http: server
};
