const events = require('./events');

module.exports = {
    [events.RIDE_ACCEPT]: 'drivers.sendAccepted',
    [events.RIDE_DECLINE]: 'drivers.sendDeclined',
    [events.RIDE_CANCELED]: 'rides.cancelRide',
    [events.RIDE_STARTED]: 'drivers.startRide',
    [events.DRIVER_ARRIVED]: 'drivers.arrivedEvent',
    [events.DRIVER_LOCATION]: 'riders.sendDriverLocation',
    [events.DRIVER_SELECTED]: 'drivers.sendSelected',
    [events.RIDER_CANCELED]: 'riders.sendCanceled',
    [events.RIDE_ENDED]: 'riders.sendEnded',
    [events.DRIVER_REMOVE]: 'riders.sendRemove',
    [events.DRIVER_ADD]: 'riders.sendAdd'
};
