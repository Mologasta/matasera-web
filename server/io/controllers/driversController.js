const { DriversMiddlewares, RidersMiddlewares, RidesMiddlewares } = require('../middlewares');

class DriversController {

    /**
     * Send driver info on accepted ride event
     * @return {*[]}
     */
    get sendAccepted(){
        return [
            DriversMiddlewares.findDriverById,
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendAcceptedNotification,
        ];
    }

    /**
     * Send driver info on declined ride event
     * @return {*[]}
     */
    get sendDeclined(){
        return [
            DriversMiddlewares.findDriverById,
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendDeclinedNotification,
        ];
    }

    /**
     * Send selected event
     * @return {*[]}
     */
    get sendSelected(){
        return [
            RidesMiddlewares.findRideById,
            DriversMiddlewares.findDriverById,
            DriversMiddlewares.sendSelectedNotification,
        ];
    }

    /**
     * Send arrived event
     * @return {*[]}
     */
    get arrivedEvent(){
        return [
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendArrivedNotification
        ];
    }

    /**
     * Send start ride event
     * @return {*[]}
     */
    get startRide(){
        return [
            RidesMiddlewares.findRideById,
            RidersMiddlewares.sendStartedRideNotification
        ];
    }
}

module.exports = DriversController;