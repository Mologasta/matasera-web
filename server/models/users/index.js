const passwordSetters = require('../../utils/setters/password');

module.exports = {
    name: 'User',
    schema: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            set: passwordSetters.hashPassword,
            required: true
        },
        // salt: {
        //     type: String,
        //     required: true
        // },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
};
