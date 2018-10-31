const { UploadMiddlewares, ImagesMiddlewares } = require('../../middlewares');
const multiparty = require('connect-multiparty');
const Controller = require('../../utils/baseController');


class ImagesController extends Controller {
    /**
     * Upload file
     */
    get upload() {
        return [
            multiparty(),
            UploadMiddlewares.validatePhoto,
            UploadMiddlewares.uploadToS3,
            ImagesMiddlewares.saveData,
            this.sendResponse()
        ];
    }
}

module.exports = ImagesController;
