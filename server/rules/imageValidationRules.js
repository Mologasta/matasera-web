const Joi = require('joi');
const { VALIDATION_RULES } = require('../constants');

class ImageValidationRules {

    /**
     * location validation
     * @return {{lat, lng}}
     */
    static location() {
        return {
            lat: Joi
                .number()
                .max(VALIDATION_RULES.MAX_COORD)
                .min(VALIDATION_RULES.MIN_COORD)
                .required(),
            lng: Joi
                .number()
                .max(VALIDATION_RULES.MAX_COORD)
                .min(VALIDATION_RULES.MIN_COORD)
                .required(),
        };
    }

    /**
     * Radius validation
     * @return {{radius}}
     */
    static radius() {
        return {
            radius: Joi
                .number()
                .max(VALIDATION_RULES.MAX_RADIUS)
                .integer()
                .required(),
        };
    }

    /**
     * Comment text validation
     * @return {{text}}
     */
    static commentText() {
        return {
            text: Joi
                .string()
                .trim()
                .max(VALIDATION_RULES.MAX_COMMENT_LENGTH)
                .required(),
        };
    }
}

module.exports = ImageValidationRules;
