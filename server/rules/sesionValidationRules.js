const Joi = require('joi');

class SessionValidationRules {

    /**
     * Create session validation rules
     */
    static refreshToken() {
        return {
            refreshToken: Joi
                .string()
                .required()
        };
    }

    /**
     * Token lifetime param validation
     * @return {{lifeTime: *|void}}
     */
    static lifeTime() {
        return {
            lifeTime: Joi
                .number()
                .integer()
                .positive()
                .allow(0)
        };
    }
}

module.exports = SessionValidationRules;