const uuid = require('uuid');
const elastic = require('./elastic');
const logger = require('./logger');
const conf = require('./../../config');

class Logger {
    static writer(req, res, next) {
        const start = new Date();
        const request = {
            host: req.headers.host,
            userAgent: req.headers['user-agent'],
            headers: Logger.getHeaders(req.headers),
            method: req.method,
            requestId: uuid.v4()
        };

        elastic.create({
            index: `${conf.elastic.prefix}_request`,
            type: 'log',
            id: request.requestId,
            body: {
                level: 'info',
                tags: ['request', 'log'],
                host: req.headers.host,
                method: req.method,
                data: JSON.stringify(request),
                published: true,
                published_at: new Date(),
            }
        })
            .catch(error => {
                this.writeLog('error', error);
            });

        res.on('finish', () => {
                const response = {
                    duration: `duration: ${new Date().getTime() - start.getTime()}`,
                    headers: Logger.getHeaders(res._headers),
                    requestId: request.requestId
                };

                elastic.create({
                    index: `${conf.elastic.prefix}_response`,
                    type: 'log',
                    id: request.requestId,
                    body: {
                        level: 'info',
                        tags: ['response', 'log'],
                        data: JSON.stringify(response),
                        duration: response.duration,
                        published: true,
                        published_at: new Date(),
                    }
                })
                    .catch(error => {
                        Logger.writeLog('error', error);
                    });

                Logger.writeLog('info', response);

            }
        );

        Logger.writeLog('info', request);
        next();
    };

    static writeLog(level, data) {
        logger[level](data);
    };

    static log(level, value) {
        let data;

        if (typeof value === 'object') {
            data = JSON.stringify(value)
        }

        elastic.create({
            index: `${level}_log`,
            type: 'log',
            id: uuid.v4(),
            body: {
                level: level,
                tags: [level, 'log'],
                data: data,
                published: true,
                published_at: new Date(),
            }
        })
        .catch(error => {
                logger.error(error)
        });

        logger[level](data);
    };

    /**
     *
     * @param headers
     * @return {Object}
     * @private
     */
    static getHeaders(headers) {
        const data = Object.assign({}, headers);
        delete data['cookie'];
        return data;
    }
}

module.exports = Logger;
