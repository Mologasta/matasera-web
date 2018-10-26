const schema = require('./schema');
const PasswordHelpers = require('../../utils/setters/password');

schema.pre('save', function (next) {
    PasswordHelpers.hashPassword(this, next);
});
schema.pre('update', function (next) {
    PasswordHelpers.hashPassword(this, next)
});

schema.method({
    baseFormat: function() {
        return {
            id: this.id,

            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    },
    sessionFormat: function(credentials) {
        return {
            profile: this.baseFormat(),
            credentials: {
                token: credentials.token,
                tokenExpireAt: credentials.tokenExpireAt.toISOString(),
                refreshToken: credentials.refreshToken,
                refreshTokenExpireAt: credentials.refreshTokenExpireAt.toISOString(),
            }
        }
    }
});

module.exports = {
    name: 'Users',
    schema: schema,
};
