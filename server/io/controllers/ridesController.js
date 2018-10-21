const { DriversMiddlewares, RidesMiddlewares } = require('../middlewares');

class RidersController {

    /**
     * Cancel ride
     */
    get cancelRide(){
        return [
            DriversMiddlewares.findDriversByIds,
            RidesMiddlewares.findRideById,
            DriversMiddlewares.sendCancelRideNotifications,
        ];
    }
}

module.exports = RidersController;