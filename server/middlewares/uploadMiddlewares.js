const { BadRequestError } = require('../errors');
const fs = require('fs');
const fileType = require('file-type');
const uuid = require('uuid');
const { S3Service } = require('../services');
const { ERROR_CODES, VALIDATION_RULES } = require('../constants');
const LocalizationDictionary = require('../locale');

class UploadMiddlewares {

    /**
     * Validate photo middleware
     * @param req
     * @param res
     * @param next
     */
    static validatePhoto(req, res, next) {
        if (!req.files || !req.files.photo) {
            return next(new BadRequestError(
                ERROR_CODES.VALIDATION_ERROR,
                LocalizationDictionary.getText('PHOTO_REQUIRED', req.locale)
            ));
        }

        if (req.files.photo.size > VALIDATION_RULES.MAX_PHOTO_SIZE) {
            return next(new BadRequestError(
                ERROR_CODES.VALIDATION_ERROR,
                LocalizationDictionary.getText('FILE_TOO_LARGE', req.locale)
            ));
        }

        fs.readFile(req.files.photo.path, (err, file) => {
            if (err) {
                return next(err);
            }

            const type = fileType(file);
            if(type === null || VALIDATION_RULES.PHOTO_MIME_TYPES.indexOf(type.mime) === -1) {
                return next(new BadRequestError(
                    ERROR_CODES.VALIDATION_ERROR,
                    LocalizationDictionary.getText('INVALID_TYPE', req.locale)
                ));
            }

            res.locals.fileType = type.mime;
            next();
        });
    }

    /**
     * upload new voicemail greeting to s3
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    static uploadToS3(req, res, next) {
        const filename = `${uuid.v4()}.${req.files.photo.name.split('.').pop()}`;
        S3Service.uploadFile(
            req.files.photo.path,
            `drivers/photo/${res.locals.user.id}/${filename}`,
            res.locals.fileType
        )
            .then((photo) => {
                try {
                    fs.unlinkSync(req.files.photo.path);
                } catch (e) {
                    logger.error(e);
                }
                
                res.locals.photo = photo
            })
            .then(() => next())
            .catch((err) => {
                try {
                    fs.unlinkSync(req.files.photo.path);
                } catch (e) {
                    logger.error(e);
                }
                return next(err);
            });
    }
}

module.exports = UploadMiddlewares;