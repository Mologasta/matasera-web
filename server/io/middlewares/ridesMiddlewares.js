const { Ride, SuggestedDriver } = require('../../models');
const { NotFoundEntityError } = require('../../errors');
const { ERROR_CODES } = require('../../constants');
const LocalizationDictionary = require('../../locale');

class RidesMiddlewares {

    /**
     * Create ride middleware
     * @param context
     * @param next
     */
    static findRideById(context, next) {
        const scopes = ['suggestedList', 'withRider'];

        Ride
            .scope(scopes)
            .findById(context.body.rideId)
            .then(ride => {
                if (!ride) {
                    throw new NotFoundEntityError(
                        ERROR_CODES.NOT_FOUND,
                        LocalizationDictionary.getText('RIDE_NOT_FOUND', context.locale)
                    );
                }

                context.locals.ride = ride;
            })
            .then(() => next())
            .catch(next);
    }

    /**
     * Create ride middleware
     * @param context
     * @param next
     */
    static findRideByIds(context, next) {
        const scopes = ['suggestedList', 'withRider', { method: ['byIds', context.body.ridesIds]}];

        Ride
            .scope(scopes)
            .all()
            .then(rides => context.locals.rides = rides)
            .then(() => next())
            .catch(next);
    }

    /**
     * Clear suggested lists
     * @param context
     * @param next
     */
    static removeFromLists(context, next) {
        const driver = context.locals.driver;
        const scopes = [{ method: ['suggested', driver.id]}];

        SuggestedDriver
            .scope(scopes)
            .destroy()
            .then(() => next())
            .catch(next);
    }
}

module.exports = RidesMiddlewares;