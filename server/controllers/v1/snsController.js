const Controller = require('../../utils/baseController');
const { SnsMiddlewares } = require('../../middlewares');


class SNSController extends Controller {
    /**
     * Registration
     */
    get confirm() {
        return [
            SnsMiddlewares.getHeader,
            this.sendResponse()
        ];
    }
}

module.exports = SNSController;
