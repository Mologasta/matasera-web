module.exports = {

    //Client events
    RECEIVE_ERROR: 'receive:error',
    RECEIVE_ACCEPT: 'receive:accept',
    RECEIVE_DECLINED: 'receive:declined',
    RECEIVE_CANCELED: 'receive:canceled',
    RECEIVE_SELECTED: 'receive:selected',
    RECEIVE_STARTED: 'receive:started',
    RECEIVE_ARRIVED: 'receive:arrived',
    RECEIVE_LOCATION: 'receive:location',
    RECEIVE_ENDED: 'receive:ended',
    RECEIVE_REMOVE: 'receive:remove',
    RECEIVE_ADD: 'receive:add',

    //Server events
    DRIVER_SELECTED: 'driver:selected',
    DRIVER_LOCATION: 'driver:location',
    RIDE_ACCEPT: 'ride:accept',
    RIDE_DECLINE: 'ride:decline',
    RIDE_CANCELED: 'ride:canceled',
    RIDE_ENDED: 'ride:ended',
    DRIVER_ARRIVED: 'driver:arrived',
    RIDE_STARTED: 'ride:started',
    RIDER_CANCELED: 'rider:canceled',
    DRIVER_REMOVE: 'driver:remove',
    DRIVER_ADD: 'driver:add'
};
