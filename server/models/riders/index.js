const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Rider extends Sequelize.Model {

    static associate({ RiderLocation, Ride, Device, RiderCard, DeviceRider, Debt, UpdateRequest }) {

        this.hasOne(RiderLocation, {
            foreignKey: 'riderId',
            as: 'riderLocation',
        });

        this.hasOne(Ride, {
            foreignKey: 'riderId',
            as: 'ride',
        });

        this.hasOne(UpdateRequest, {
            foreignKey: 'riderId',
            as: 'updateRequest',
        });

        this.hasOne(Debt, {
            foreignKey: 'riderId',
            as: 'debt',
        });

        this.hasMany(RiderCard, {
            foreignKey: 'riderId',
            as: 'cards',
        });

        this.belongsToMany(Device, {
            through: DeviceRider,
            foreignKey: 'userId',
            otherKey: 'deviceId',
            as: 'devices',
        });
    }

    get cacheId() {
        return `rider:${this.id}`;
    }

    baseFormat() {
        return {
            id: this.id,

            firstName: this.firstName,
            lastName: this.lastName,
            number: this.number,
            isVerified: this.isVerified,
            isAdult: this.isAdult,
            role: this.role,
            state: this.state,
            email: this.email,
            updateRequest: this.updateRequest && this.updateRequest.baseFormat(),
            riderLocation: this.riderLocation && this.riderLocation.baseFormat(),
            drivers: this.drivers && this.drivers.map(d => d.baseFormat()),
            cards: this.cards && this.cards.map(c => c.baseFormat()),
            ride: this.ride && this.ride.baseFormat(),
            unreadCount: this.unreadCount,
            charged: this.charged,
            debt: this.debt && this.debt.baseFormat(),

            characteristics: this.characteristics,
            smokingPreference: this.smokingPreference,
            ridePreference: this.ridePreference,

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

Rider.init(schema, options);

module.exports = Rider;