const { DriversMiddlewares, RidesMiddlewares, RidersMiddlewares } = require('../middlewares');

class RidersController {

    /**
     * Send driver location
     */
    get sendDriverLocation(){
        return [
            DriversMiddlewares.findDriverById,
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendDriverLocation,
        ];
    }

    /**
     * Send remove
     */
    get sendRemove() {
        return [
            DriversMiddlewares.findDriverById,
            RidersMiddlewares.removeFromListsNotifications,
        ];
    }

    /**
     * Send driver to riders
     */
    get sendAdd() {
        return [
            DriversMiddlewares.findDriverById,
            RidesMiddlewares.findRideByIds,
            DriversMiddlewares.countRate,
            RidersMiddlewares.addToListsNotifications,
        ];
    }

    /**
     * Send canceled
     */
    get sendCanceled(){
        return [
            RidersMiddlewares.findRiderById,
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendCanceledNotification,
        ];
    }

    /**
     * Send ended
     */
    get sendEnded(){
        return [
            RidersMiddlewares.findRiderById,
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendEndedNotification,
        ];
    }
}

module.exports = RidersController;