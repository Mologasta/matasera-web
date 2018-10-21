const LocalizationDictionary = require('../locale');
const { VALIDATION_RULES } = require('../constants');
const Joi = require('joi');

class VerificationValidationRules {

    /**
     * users number validation rules
     * @returns {{number}}
     */
    static number(locale) {
        return {
            number: Joi
                .string()
                .trim()
                .regex(VALIDATION_RULES.PHONE_REGEX)
                .options({
                    language: {
                        string: {
                            regex: {
                                base: LocalizationDictionary.getText('PHONE_REGEX_MESSAGE', locale)
                            }
                        }
                    }
                })
                .required(),
        };
    }

    /**
     * verification code validation rules
     * @returns {{code}}
     */
    static code() {
        return {
            code: Joi
                .string()
                .trim()
                .length(VALIDATION_RULES.VERIFICATION_CODE_LENGTH)
                .regex(VALIDATION_RULES.VERIFICATION_CODE_REGEX)
                .required(),
        };
    }
}

module.exports = VerificationValidationRules;