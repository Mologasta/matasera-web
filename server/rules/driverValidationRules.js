const Joi = require('joi');
const { VALIDATION_RULES, DRIVERS_QUALIFICATIONS } = require('../constants');

const QUALIFICATION_OPTIONS = Object.keys(DRIVERS_QUALIFICATIONS).map(key => DRIVERS_QUALIFICATIONS[key]);

class DriversValidationRules {

    /**
     * Drivers additional fields validation rules
     */
    static additionalFields() {
        return {
            homeAddress: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_ADDRESS_LENGTH)
                .max(VALIDATION_RULES.MAX_ADDRESS_LENGTH)
                .required(),
            city: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_CITY_LENGTH)
                .max(VALIDATION_RULES.MAX_CITY_LENGTH)
                .required(),
            standard: Joi
                .boolean()
                .required(),
            canDriveChildren: Joi
                .boolean()
                .when('standard', {is: true, then: Joi.optional(), otherwise: Joi.forbidden()}),
            needSomeAssistance: Joi
                .boolean()
                .when('standard', {is: true, then: Joi.optional(), otherwise: Joi.forbidden()}),
            foldingWheelChair: Joi
                .boolean()
                .when('standard', {is: false, then: Joi.optional(), otherwise: Joi.forbidden()}),
            electricWheelChair: Joi
                .boolean()
                .when('standard', {is: false, then: Joi.optional(), otherwise: Joi.forbidden()}),
            drivePassengersWithNeeds: Joi
                .boolean()
                .when('standard', {is: false, then: Joi.optional(), otherwise: Joi.forbidden()}),
            isVolunteer: Joi
                .boolean()
                .optional(),
        };
    }

    /**
     * Drivers preferences validation rules
     */
    static reconsiderPreferences() {
        return {
            standard: Joi
                .boolean()
                .required(),
            canDriveChildren: Joi
                .boolean()
                .required(),
            needSomeAssistance: Joi
                .boolean()
                .required(),
            foldingWheelChair: Joi
                .boolean()
                .required(),
            electricWheelChair: Joi
                .boolean()
                .required(),
            drivePassengersWithNeeds: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Drivers details validation rules
     */
    static driversDetails() {
        return {
            driversLicenceExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            paramedicLicenceExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            vehicleRegistrationExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            model: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_MODEL_LENGTH)
                .max(VALIDATION_RULES.MAX_MODEL_LENGTH)
                .regex(VALIDATION_RULES.MODEL_REGEX)
                .required(),
            licencePlate: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_LICENCE_PLATE_LENGTH)
                .max(VALIDATION_RULES.MAX_LICENCE_PLATE_LENGTH)
                .regex(VALIDATION_RULES.LICENCE_PLATE_REGEX)
                .required(),
            numberOfSeats: Joi
                .number()
                .integer()
                .min(VALIDATION_RULES.MIN_NUM_OF_SEATS)
                .max(VALIDATION_RULES.MAX_NUM_OF_SEATS)
                .required(),
            placeForLuggage: Joi
                .boolean()
                .required(),
            smoking: Joi
                .boolean()
                .required(),
            pets: Joi
                .boolean()
                .required(),
            babyChair: Joi
                .boolean()
                .required(),
            taxi: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Update drivers data validation rules
     */
    static updateData() {
        return {
            driversLicenceExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            paramedicLicenceExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            vehicleRegistrationExpDate: Joi
                .date()
                .iso()
                .min(new Date())
                .required(),
            placeForLuggage: Joi
                .boolean()
                .required(),
            smoking: Joi
                .boolean()
                .required(),
            pets: Joi
                .boolean()
                .required(),
            babyChair: Joi
                .boolean()
                .required(),
            taxi: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Drivers fares validation rules
     * @return {{minimumFare, ratePerMinute, ratePerMile, baseFare}}
     */
    static fares() {
        return {
            minimumFare: Joi
                .number()
                .greater(0)
                .precision(2)
                .strict(true)
                .required(),
            ratePerMinute: Joi
                .number()
                .greater(0)
                .precision(2)
                .strict(true)
                .required(),
            ratePerMile: Joi
                .number()
                .greater(0)
                .precision(2)
                .strict(true)
                .required(),
            baseFare: Joi
                .number()
                .greater(0)
                .precision(2)
                .strict(true)
                .required(),
        };
    }

    /**
     * Address validation rules
     * @return {{address}}
     */
    static distance() {
        return {
            distance: Joi
                .number()
                .integer()
                .required(),
        };
    }

    /**
     * Qualification validation rules
     * @return {{qualification}}
     */
    static qualification() {
        return {
            qualification: Joi
                .number()
                .integer()
                .valid(QUALIFICATION_OPTIONS.concat(0))
                .optional(),
        };
    }

    /**
     * Drivers status validation rules
     * @return {{online}}
     */
    static status() {
        return {
            online: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Drivers isFree param validation rules
     * @return {{online}}
     */
    static isFree() {
        return {
            isFree: Joi
                .boolean()
                .required(),
        };
    }

    /**
     * Drivers isVolunteer param validation rules
     * @return {{isVolunteer}}
     */
    static isVolunteer() {
        return {
            isVolunteer: Joi
                .boolean()
                .required(),
        };
    }
}

module.exports = DriversValidationRules;