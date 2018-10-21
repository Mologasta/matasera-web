const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Admin extends Sequelize.Model {

    static associate({ AdminCard }) {

        this.hasOne(AdminCard, {
            foreignKey: 'adminId',
            as: 'card',
        });
    }

    get cacheId() {
        return `admin:${this.id}`;
    }

    baseFormat() {
        return {
            id: this.id,

            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            role: this.role,
            lastPasswordUpdate: this.lastPasswordUpdate && this.lastPasswordUpdate.toISOString(),
            card: this.card && this.card.baseFormat(),

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }

    sessionFormat(credentials) {
        return {
            profile: this.baseFormat(),
            credentials: {
                token: credentials.token,
                tokenExpireAt: credentials.tokenExpireAt.toISOString(),
                refreshToken: credentials.refreshToken,
                refreshTokenExpireAt: credentials.refreshTokenExpireAt.toISOString(),
            }
        };
    }
}

Admin.init(schema, options);

module.exports = Admin;