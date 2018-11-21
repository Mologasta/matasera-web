const { UploadMiddlewares, ImagesMiddlewares } = require('../../middlewares');
const multiparty = require('connect-multiparty');
const Controller = require('../../utils/baseController');
const { ImageValidationRules } = require('../../rules');
const bodyValidator = require('../../utils/bodyValidator');


class ImagesController extends Controller {
    /**
     * Upload file
     */
    get upload() {
        return [
            multiparty(),
            UploadMiddlewares.validatePhoto,
            ImagesMiddlewares.getImageGPS,
            UploadMiddlewares.uploadToS3,
            ImagesMiddlewares.saveData,
            ImagesMiddlewares.formatImage,
            this.sendResponse()
        ];
    }

    /**
     * Upload file
     */
    get getImages() {
        return [
            bodyValidator([
                ImageValidationRules.location,
                ImageValidationRules.radius
            ]),
            ImagesMiddlewares.getImages,
            ImagesMiddlewares.formatImages,
            this.sendResponse()
        ];
    }
}

module.exports = ImagesController;
