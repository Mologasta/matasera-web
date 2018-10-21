const { Driver, Rate } = require('../../models');
const events = require('../events');
const { NotFoundEntityError } = require('../../errors');
const { ERROR_CODES } = require('../../constants');
const LocalizationDictionary = require('../../locale');

class DriversMiddlewares {

    /**
     * Get drivers middleware
     * @param context
     * @param next
     */
    static findDriversByIds(context, next) {
        const scopes = [
            { method: ['byIds', context.body.driversIds]},
        ];

        Driver
            .scope(scopes)
            .all()
            .then(drivers => context.locals.drivers = drivers)
            .then(() => next())
            .catch(next);
    }

    /**
     * Get drivers middleware
     * @param context
     * @param next
     */
    static findDriverById(context, next) {
        const scopes = ['withFares', 'withDetails', 'withLocation'];

        Driver
            .scope(scopes)
            .findById(context.body.driverId)
            .then(driver => {
                if (!driver) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.NOT_FOUND,
                        LocalizationDictionary.getText('DRIVER_NOT_FOUND', context.locale)
                    );
                }

                context.locals.driver = driver;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Count drivers rate middleware
     * @param context
     * @param next
     */
    static countRate(context, next) {
        const driver = context.locals.driver;
        const scopes = [
            { method: ['byDriver', driver.id] },
            'countAvgRate'
        ];

        Rate
            .scope(scopes)
            .find()
            .then(rate => {
                if (rate.dataValues.rating) {
                    context.locals.driver.rating = +rate.dataValues.rating;
                }
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Send notifications to drivers
     * @param context
     * @param next
     */
    static sendCancelRideNotifications(context, next) {
        const drivers = context.locals.drivers;
        const ride = context.locals.ride;

        const data = {
            rideId: ride.id,
            state: ride.state,
            message: LocalizationDictionary.getText('CANCELED', context.locale)
        };

        drivers.forEach(driver => {
            context.io
                .to(`driver:${driver.id}`)
                .emit(events.RECEIVE_CANCELED, data);
        });

        next();
    }

    /**
     * Send rejected notifications to drivers
     * @param context
     * @param next
     */
    static sendSelectedNotification(context, next) {
        const driver = context.locals.driver;
        const ride = context.locals.ride;

        const data = {
            ride: ride.baseFormat(),
            message: LocalizationDictionary.getText('SELECTED', context.locale)
        };

        context.io
            .to(`driver:${driver.id}`)
            .emit(events.RECEIVE_SELECTED, data);

        next();
    }
}

module.exports = DriversMiddlewares;