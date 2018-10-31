const Joi = require('joi');
const { VALIDATION_RULES, ORDERS, VALID_FIELDS } = require('../constants');

const LocalizationDictionary = require('../locale');

class CommonValidationRules {
    /**
     * Create user validation rules
     * @returns {{number, firstName, lastName}}
     */
    static mainFields(locale) {
        return {
            firstName: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_NAME_LENGTH)
                .max(VALIDATION_RULES.MAX_NAME_LENGTH)
                .regex(VALIDATION_RULES.USER_NAME_REGEX)
                .options({
                    language: {
                        string: {
                            regex: {
                                base: LocalizationDictionary.getText('NAME_REGEX_MESSAGE', locale)
                            },
                            min: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale),
                            max: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale)
                        }
                    }
                })
                .required(),
            lastName: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_NAME_LENGTH)
                .max(VALIDATION_RULES.MAX_NAME_LENGTH)
                .regex(VALIDATION_RULES.USER_NAME_REGEX)
                .options({
                    language: {
                        string: {
                            regex: {
                                base: LocalizationDictionary.getText('NAME_REGEX_MESSAGE', locale)
                            },
                            min: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale),
                            max: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale)
                        }
                    }
                })
                .required(),
            username: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_USERNAME_LENGTH)
                .max(VALIDATION_RULES.MAX_USERNAME_LENGTH)
                .regex(VALIDATION_RULES.USERNAME_REGEX)
                .required(),
        };
    }

    /**
     * Search validation rules
     */
    static get search() {
        return {
            filter: Joi
                .string()
                .allow('')
                .optional()
        };
    }

    /**
     * Order validation rules
     */
    static get order() {
        return {
            order: Joi
                .string()
                .valid(ORDERS.ASC, ORDERS.DESC)
                .optional()
        };
    }

    /**
     * Field validation rules
     */
    static get field() {
        return {
            field: Joi
                .string()
                .trim()
                .valid(VALID_FIELDS.ADMIN_LISTS)
                .optional()
        };
    }

    /**
     * Pagination validation rules
     */
    static get pagination() {
        return {
            limit: Joi
                .number()
                .integer()
                .positive()
                .optional(),
            offset: Joi
                .number()
                .integer()
                .positive()
                .allow(0)
                .optional()
        };
    }

    /**
     * Email validation (*required)
     * @param locale
     * @return {{email}}
     */
    static email(locale) {
        return {
            email: Joi
                .string()
                .email()
                .max(VALIDATION_RULES.MAX_EMAIL_LENGTH)
                .options({
                    language: {
                        string: {
                            email:  LocalizationDictionary.getText('INVALID_EMAIL', locale)
                        }
                    },
                })
                .required(),
        };
    }

    /**
     * Drivers location validation rules
     * @return {{lat, long}}
     */
    static location() {
        return {
            latitude: Joi
                .number()
                .required(),
            longitude: Joi
                .number()
                .required(),
        };
    }

    /**
     * Timeout validation rules
     * @return {{timeout}}
     */
    static timeOut() {
        return {
            timeOut: Joi
                .number()
                .integer()
                .optional(),
        };
    }

    /**
     * Drivers direction validation rules
     * @return {{direction}}
     */
    static direction() {
        return {
            direction: Joi
                .number()
                .optional(),
        };
    }

    /**
     * Rider stripe token
     * @returns {{ token }}
     */
    static token() {
        return {
            token: Joi
                .string()
                .required()
        };
    }

    /**
     * Login password validation
     * @param locale
     * @return {{password}}
     */
    static loginPassword(locale) {
        return {
            password: Joi
                .string()
                .trim()
                .regex(VALIDATION_RULES.PASSWORD_BASE_REGEX)
                .regex(VALIDATION_RULES.PASSWORD_LENGTH)
                .options({
                    language: {
                        string: {
                            regex: {
                                base: LocalizationDictionary.getText('INVALID_LOGIN_PASSWORD_MESSAGE', locale)
                            }
                        }
                    },
                    abortEarly: true,
                })
                .required()
        };
    }

    /**
     * Password validation rules
     * @returns {{password}}
     */
    static password(fieldName = 'password') {
        return (locale) => CommonValidationRules.createPasswordValidator(locale, fieldName);
    }

    /**
     * Password validation rules
     * @returns {{password}}
     */
    static createPasswordValidator(locale, fieldName = 'password') {
        return {
            [fieldName]: Joi
                .string()
                .trim()
                .min(VALIDATION_RULES.MIN_PASSWORD_LENGTH)
                .max(VALIDATION_RULES.MAX_PASSWORD_LENGTH)
                .regex(VALIDATION_RULES.PASSWORD_BASE_REGEX)
                .options({
                    language: {
                        string: {
                            regex: {
                                base: LocalizationDictionary.getText('PASSWORD_REGEX_MESSAGE', locale)
                            },
                            max: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale),
                            min: LocalizationDictionary.getText('LENGTH_CRITERIA_MESSAGE', locale)
                        }
                    }
                })
                .required()
        };
    }
}

module.exports = CommonValidationRules;
