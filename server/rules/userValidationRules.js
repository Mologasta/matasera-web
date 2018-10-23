const Joi = require('joi');
const { RIDER_CHARACTERISTICS, SMOKING_PREFERENCES, RIDE_PREFERENCES } = require('../constants');


const CHARACTERISTICS = Object.keys(RIDER_CHARACTERISTICS).map(key => RIDER_CHARACTERISTICS[key]);
const SMOKING_PREFS = Object.keys(SMOKING_PREFERENCES).map(key => SMOKING_PREFERENCES[key]);
const RIDE_PREFS = Object.keys(RIDE_PREFERENCES).map(key => RIDE_PREFERENCES[key]);

class UsersValidationRules {
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
}

module.exports = UsersValidationRules;
