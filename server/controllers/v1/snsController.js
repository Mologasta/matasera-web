const Controller = require('../../utils/baseController');
const { SnsMiddlewares, ImagesMiddlewares } = require('../../middlewares');


class SNSController extends Controller {
    /**
     * Registration
     */
    get confirm() {
        return [
            SnsMiddlewares.getSnsNotification,
            ImagesMiddlewares.saveData,
            this.sendResponse()
        ];
    }
}

module.exports = SNSController;
