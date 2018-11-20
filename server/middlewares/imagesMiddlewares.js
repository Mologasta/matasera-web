const { Image } = require('../models');
const ExifImage = require('exif').ExifImage;
const { ERROR_CODES } = require('../constants');
const { UnprocessableEntityError } = require('../errors');
const GpsHelper = require('../helpers/gpsHelper');

class ImagesMiddlewares {

    /**
     * Save image middleware
     * @param req
     * @param res
     * @param next
     */
    static saveData(req, res, next) {
        const gpsData = GpsHelper.formatData(res.locals.gpsData);
        const instance = new Image({ path: res.locals.image, lat: gpsData.lat, lng: gpsData.lng });

        instance
            .save(res.locals.photo)
            .then(image => res.locals.image = image)
            .then(() => next())
            .catch(next)
    }

    /**
     * Get gps image data
     * @param req
     * @param res
     * @param next
     */
    static getImageGPS(req, res, next) {
        if(!req.body.lat || !req.body.long) {
            try {
                new ExifImage({ image : req.files.image.path }, function (error, exifData) {
                    if (error)
                        throw new UnprocessableEntityError(ERROR_CODES.UNPROCESSABLE, error);

                        res.locals.gpsData = exifData.gps
                });
            } catch (error) {
                throw new UnprocessableEntityError(ERROR_CODES.UNPROCESSABLE, error.message);
            }
        }

        next()
    }
}

module.exports = ImagesMiddlewares;
