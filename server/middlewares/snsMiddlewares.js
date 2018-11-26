const request = require('request');
const ExifImage = require('exif').ExifImage;
const { BadRequestError } = require('../errors');
const { ERROR_CODES } = require('../constants');
const fs = require('fs');
const uuid = require('uuid');

class SnsMiddlewares {

    /**
     * Save image middleware
     * @param req
     * @param res
     * @param next
     */
    static getSnsNotification(req, res, next) {
        if (req.headers['x-amz-sns-message-type'] === 'SubscriptionConfirmation') {
            request
                .get(req.body.SubscribeURL)
                .on('response', function () {
                    return next()
                })
                .on('error', (err) => {
                        next(err)
                    }
                )
        }

        if (req.headers['x-amz-sns-message-type'] === 'Notification') {
            const record = JSON.parse(req.body.Message).Records[0];
            const fileName = `${uuid.v4()}.${record.s3.object.key.split('.')[1]}`;
            res.locals.image = `https://s3.amazonaws.com/${record.s3.bucket.name}/${record.s3.object.key}`;

            request
                .get(res.locals.image)
                .on('error', function(err) {
                    return next(err);
                })
                .pipe(fs.createWriteStream(`tmp/${fileName}`));

            try {
                new ExifImage({image: `tmp/${fileName}`}, function (error, exifData) {
                    if (error) {
                        throw new BadRequestError(ERROR_CODES.INTERNAL_ERROR, error);
                    }

                    res.locals.gpsData = exifData.gps
                });
            } catch (error) {
                throw new BadRequestError(ERROR_CODES.INTERNAL_ERROR, error.message);
            }
        }
    }
}

module.exports = SnsMiddlewares;
