const { Image } = require('../models');
const ExifImage = require('exif').ExifImage;
const { ERROR_CODES } = require('../constants');
const { UnprocessableEntityError, NotFoundEntityError } = require('../errors');
const GpsHelper = require('../helpers/gpsHelper');
const LocalizationDictionary = require('../locale');

class ImagesMiddlewares {

    /**
     * Save image middleware
     * @param req
     * @param res
     * @param next
     */
    static saveData(req, res, next) {
        let gpsData;

        if(res.locals.gpsData) {
            gpsData = GpsHelper.formatData(res.locals.gpsData);
        }

        const location = {
            lat: gpsData && parseFloat(gpsData.lat) || parseFloat(req.body.lat),
            lng: gpsData && parseFloat(gpsData.lng) || parseFloat(req.body.lng),
        };

        const instance = new Image({
            path: res.locals.image,
            location,
        });

        instance
            .save()
            .then(image => res.locals.image = image)
            .then(() => next())
            .catch(next)
    }

    /**
     * Find image by id middleware
     * @param req
     * @param res
     * @param next
     */
    static findImageById(req, res, next) {
        const imageId = req.params.imageId;

        Image
            .find({ _id: imageId})
            .then(image => {
                if(!image) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('IMAGE_NOT_FOUND', req.locale)
                    );
                }

                res.locals.image = image[0];
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Get images middleware
     * @param req
     * @param res
     * @param next
     */
    static getImages(req, res, next) {
        const options = { near: [ req.query.lat, req.query.lng], maxDistance: req.query.radius };

        Image
            .geoSearch({}, options)
            .then(results => res.locals.images = results)
            .then(() => next())
            .catch(next);
    }

    /**
     * Format image middleware
     * @param req
     * @param res
     * @param next
     */
    static formatImage(req, res, next) {
        res.locals.data = res.locals.image.baseFormat();
        next();
    }

    /**
     * Format images middleware
     * @param req
     * @param res
     * @param next
     */
    static formatImages(req, res, next) {
        res.locals.data = res.locals.images.map(i => i.baseFormat());
        next();
    }

    /**
     * Get gps image data
     * @param req
     * @param res
     * @param next
     */
    static getImageGPS(req, res, next) {
        if(!req.body.lat || !req.body.lng) {
            try {
                new ExifImage({ image : req.files.image.path }, function (error, exifData) {
                    if (error) {
                        throw new UnprocessableEntityError(ERROR_CODES.UNPROCESSABLE, error);
                    }

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
