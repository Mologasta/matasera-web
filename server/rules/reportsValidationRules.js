const Joi = require('joi');
const { REPORT_TYPES, VALIDATION_RULES } = require('../constants');


const REPORTS = Object.keys(REPORT_TYPES).map(key => REPORT_TYPES[key]);


class ReportsValidationRules {

    /**
     * Report validation rules
     * @returns {{ token }}
     */
    static report() {
        return {
            reason: Joi
                .number()
                .integer()
                .valid(REPORTS)
                .required(),
            comment: Joi
                .when('reason', {
                    is: REPORT_TYPES.OTHER,
                    then: Joi.string().trim().max(VALIDATION_RULES.MAX_COMMENT).optional(),
                    otherwise: Joi.forbidden()
                })
        };
    }
}

module.exports = ReportsValidationRules;