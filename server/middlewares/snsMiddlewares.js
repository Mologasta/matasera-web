const request = require('request');

class SnsMiddlewares {

    /**
     * Save image middleware
     * @param req
     * @param res
     * @param next
     */
    static getHeader(req, res, next) {
        if (req.headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
            request
                .get(req.body.SubscribeURL)
                .on('response', function (response) {

                })
                .on('error', (err) => {
                        next(err)
                    }
                )
        }
    }
}

module.exports = SnsMiddlewares;
