const request = require('request');
const ExifImage = require('exif').ExifImage;
const { BadRequestError } = require('../errors');
const { Image } = require('../models');
const { ERROR_CODES } = require('../constants');
const fs = require('fs');
const LocalizationDictionary = require('../locale');
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

            Image
                .findOne({ path: res.locals.image })
                .then(result => {
                    if(result) {
                        throw new BadRequestError(
                            ERROR_CODES.INTERNAL_ERROR,
                            LocalizationDictionary.getText('ALREADY_CREATED')
                        );
                    }

                    next();
                })
                .then(() => next())
                .catch(next);


            request
                .get(res.locals.image)
                .on('error', function(err) {
                    return next(err);
                })
                .pipe(
                    fs.createWriteStream(`tmp/${fileName}`)
                    .on('close', () => {
                        try {
                            new ExifImage({image: `tmp/${fileName}`}, function (error, exifData) {
                                if (error) {
                                    fs.unlinkSync(`tmp/${fileName}`);
                                    throw new BadRequestError(ERROR_CODES.INTERNAL_ERROR, error);
                                }

                                fs.unlinkSync(`tmp/${fileName}`);
                                res.locals.gpsData = exifData.gps;

                                next();
                            });
                        }
                        catch (error) {
                            fs.unlinkSync(`tmp/${fileName}`);
                            throw new BadRequestError(ERROR_CODES.INTERNAL_ERROR, error.message);
                        }
                }));
        }
    }
}

module.exports = SnsMiddlewares;
