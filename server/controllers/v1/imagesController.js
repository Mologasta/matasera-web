const { UploadMiddlewares, ImagesMiddlewares, CommentsMiddlewares } = require('../../middlewares');
const multiparty = require('connect-multiparty');
const Controller = require('../../utils/baseController');
const { STATUS_CODES } = require('../../constants');
const { ImageValidationRules, CommonValidationRules } = require('../../rules');
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
            this.sendResponse(STATUS_CODES.CREATED)
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

    /**
     * Add comment to image
     */
    get addComment() {
        return [
            bodyValidator([
                ImageValidationRules.commentText,
            ]),
            ImagesMiddlewares.findImageById,
            CommentsMiddlewares.addComment,
            CommentsMiddlewares.formatComment,
            this.sendResponse()
        ];
    }

    /**
     * Add comment to image
     */
    get getComments() {
        return [
            bodyValidator([
                CommonValidationRules.pagination,
            ]),
            this.pagination,
            ImagesMiddlewares.findImageById,
            CommentsMiddlewares.getComments,
            CommentsMiddlewares.formatComments,
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
