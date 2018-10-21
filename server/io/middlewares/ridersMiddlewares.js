const events = require('../events');
const { Rider, SuggestedDriver } = require('../../models');
const { ERROR_CODES } = require('../../constants');
const { NotFoundEntityError } = require('../../errors');
const LocalizationDictionary = require('../../locale');

class RidersMiddlewares {

    /**
     * Send accepted notifications to driver
     * @param context
     * @param next
     */
    static sendAcceptedNotification(context, next) {
        const ride = context.locals.ride;
        const driver = context.locals.driver;

        const data = {
            driver: driver.baseFormat(),
            message: LocalizationDictionary.getText('ACCEPTED', context.locale)
        };

        context.io
            .to(`rider:${ride.riderId}`)
            .emit(events.RECEIVE_ACCEPT, data);

        next();
    }

    /**
     * Send accepted notifications to driver
     * @param context
     * @param next
     */
    static sendDeclinedNotification(context, next) {
        const ride = context.locals.ride;
        const driverId = context.locals.driver.id;

        const data = {
            driverId,
            message: LocalizationDictionary.getText('DECLINED', context.locale)
        };

        context.io
            .to(`rider:${ride.riderId}`)
            .emit(events.RECEIVE_DECLINED, data);

        next();
    }

    /**
     * Find rider by id
     * @param context
     * @param next
     */
    static findRiderById(context, next) {
        const scopes = ['withLocation', 'withCards', 'withRide'];

        Rider
            .scope(scopes)
            .findById(context.body.riderId)
            .then(rider => {
                if(!rider) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.ENTITY_NOT_FOUND,
                        LocalizationDictionary.getText('RIDER_NOT_FOUND', context.locale)
                    );
                }

                context.locals.rider = rider;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Send started notifications rider
     * @param context
     * @param next
     */
    static sendStartedRideNotification(context, next) {
        const ride = context.locals.ride;
        const data = {
            rideId: ride.id,
            state: ride.state,
            message: LocalizationDictionary.getText('STARTED', context.locale)
        };

        context.io
            .to(`rider:${ride.riderId}`)
            .emit(events.RECEIVE_STARTED, data);

        next();
    }

    /**
     * Send arrived
     * @param context
     * @param next
     */
    static sendArrivedNotification(context, next) {
        const ride = context.locals.ride;
        const data = {
            rideId: ride.id,
            state: ride.state,
            message: LocalizationDictionary.getText('ARRIVED', context.locale)
        };

        context.io
            .to(`rider:${ride.riderId}`)
            .emit(events.RECEIVE_ARRIVED, data);

        next();
    }

    /**
     * Send drivers location
     * @param context
     * @param next
     */
    static sendDriverLocation(context, next) {
        const ride = context.locals.ride;
        const driver = context.locals.driver;

        const data = {
            rideId: ride.id,
            lat: driver.driverLocation.latitude,
            long: driver.driverLocation.longitude,
        };

        if (context.body.approxTime) {
            data.approxTime = context.body.approxTime;
        }

        context.io
            .to(`rider:${ride.riderId}`)
            .emit(events.RECEIVE_LOCATION, data);

        next();
    }

    /**
     * Remove from suggested lists notifications
     * @param context
     * @param next
     */
    static removeFromListsNotifications(context, next) {
        const ridersIds = context.body.ridersIds;
        const driverId = context.locals.driver.id;

        ridersIds.forEach(r => {
            context.io
                .to(`rider:${r}`)
                .emit(events.RECEIVE_REMOVE, { driverId: driverId });
        });

        next();
    }

    /**
     * Remove from suggested lists notifications
     * @param context
     * @param next
     */
    static addToListsNotifications(context, next) {
        const rides = context.locals.rides;
        const driver = context.locals.driver;
        const costs = context.body.costs;


        rides.forEach(r => {
            const cost = costs.find(cost => cost.rideId === r.id);
            driver.cost = cost && cost.cost;

            context.io
                .to(`rider:${r.rider.id}`)
                .emit(events.RECEIVE_ADD, { driver: driver.baseFormat() });
        });

        next();
    }

    /**
     * Send canceled notifications
     * @param context
     * @param next
     */
    static sendCanceledNotification(context, next) {
        const ride = context.locals.ride;
        const rider = context.locals.rider;

        const data = {
            rideId: ride.id,
            state: ride.state,
            message: LocalizationDictionary.getText('RIDER_CANCELED', context.locale)
        };

        context.io
            .to(`rider:${rider.id}`)
            .emit(events.RECEIVE_CANCELED, data);

        next();
    }

    /**
     * Send ended notifications
     * @param context
     * @param next
     */
    static sendEndedNotification(context, next) {
        const ride = context.locals.ride;
        const rider = context.locals.rider;

        const data = {
            ride: ride.baseFormat(),
            message: LocalizationDictionary.getText('RIDE_ENDED', context.locale)
        };

        context.io
            .to(`rider:${rider.id}`)
            .emit(events.RECEIVE_ENDED, data);

        next();
    }
}

module.exports = RidersMiddlewares;