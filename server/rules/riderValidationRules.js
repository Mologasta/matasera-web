const Joi = require('joi');
const { RIDER_CHARACTERISTICS, SMOKING_PREFERENCES, RIDE_PREFERENCES, VALIDATION_RULES, PREFERENCES_SCOPES } = require('../constants');


const CHARACTERISTICS = Object.keys(RIDER_CHARACTERISTICS).map(key => RIDER_CHARACTERISTICS[key]);
const SMOKING_PREFS = Object.keys(SMOKING_PREFERENCES).map(key => SMOKING_PREFERENCES[key]);
const RIDE_PREFS = Object.keys(RIDE_PREFERENCES).map(key => RIDE_PREFERENCES[key]);

class RiderValidationRules {
    /**
     * Create user validation rules
     * @returns {{email, number, firstName, lastName}}
     */
    static additionalFields() {
        return {
            isAdult: Joi
                .boolean()
                .required(),
            characteristics: Joi
                .number()
                .valid(CHARACTERISTICS, null)
                .optional(),
            smokingPreference: Joi
                .number()
                .valid(SMOKING_PREFS)
                .required(),
            ridePreference: Joi
                .number()
                .valid(RIDE_PREFS)
                .required(),
        };
    }

    /**
     * Rider additional params validation rules
     * @returns {{ pets, smoking, bulkyItems }}
     */
    static additionalOptions() {
        return {
            pets: Joi
                .boolean()
                .optional(),
            babyChair: Joi
                .boolean()
                .optional(),
            luggage: Joi
                .boolean()
                .optional(),
        };
    }

    /**
     * Rider donation param validation rules
     * @returns {{ donation }}
     */
    static donation() {
        return {
            donation: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Rider preferences validation rules
     * @returns {{ preferences }}
     */
    static preferences() {
        return {
            preferences: Joi
                .number()
                .valid(CHARACTERISTICS)
                .optional(),
        };
    }

    /**
     * Rate validation rules
     * @returns {{ rate }}
     */
    static rate() {
        return {
            rate: Joi
                .number()
                .integer()
                .positive()
                .min(VALIDATION_RULES.MIN_RATE)
                .max(VALIDATION_RULES.MAX_RATE)
                .required(),
        };
    }

    /**
     * Riders cardId validation rules
     * @returns {{ cardId }}
     */
    static cardId() {
        return {
            cardId: Joi
                .number()
                .integer()
                .positive()
                .required()
        };
    }

    /**
     * Start/End location validation rules
     * @return {{startLat, startLong, endLat, endLong}}
     */
    static startEndPoints() {
        return {
            startLat: Joi
                .number()
                .required(),
            startLong: Joi
                .number()
                .required(),
            endLat: Joi
                .number()
                .required(),
            endLong: Joi
                .number()
                .required(),
        };
    }

    /**
     * Driver id validation rules
     * @return {{driverId}}
     */
    static driverId() {
        return {
            driverId: Joi
                .number()
                .integer()
                .required(),
        };
    }


    /**
     * Rider comment validation rules
     * @returns {{ comment }}
     */
    static comment() {
        return {
            comment: Joi
                .string()
                .trim()
                .max(VALIDATION_RULES.MAX_COMMENT_LENGTH)
                .optional()
        };
    }

    /**
     * Ride data validation rules
     * @returns {{ comment }}
     */
    static rideData() {
        return {
            distance: Joi
                .number()
                .positive()
                .integer()
                .optional(),

            duration: Joi
                .number()
                .positive()
                .integer()
                .optional(),
        };
    }
    /**
     * Rider cancellation fee validation rules
     * @returns {{ cancellationFee }}
     */
    static cancellationFee() {
        return {
            cancellationFee: Joi
                .number()
                .allow(0)
                .min(VALIDATION_RULES.MIN_CANCELLATION_FEE)
                .positive()
                .required()
        };
    }
}

module.exports = RiderValidationRules;