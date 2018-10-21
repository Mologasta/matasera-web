const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Driver extends Sequelize.Model {

    static associate({
        DriverDetail,
        DriverFare,
        DriverLocation,
        Ride,
        Notification,
        NotificationDriver,
        Rate,
        SuggestedDriver,
        Device,
        DeviceDriver
    }) {

        this.hasOne(DriverDetail, {
            foreignKey: 'driverId',
            as: 'driverDetail',
        });

        this.hasOne(DriverFare, {
            foreignKey: 'driverId',
            as: 'driverFare',
        });

        this.hasOne(DriverLocation, {
            foreignKey: 'driverId',
            as: 'driverLocation',
        });

        this.belongsToMany(Ride, {
            through: SuggestedDriver,
            foreignKey: 'driverId',
            otherKey: 'rideId',
            as: 'rides',
        });

        this.belongsToMany(Device, {
            through: DeviceDriver,
            foreignKey: 'userId',
            otherKey: 'deviceId',
            as: 'devices',
        });

        this.belongsToMany(Notification, {
            through: NotificationDriver,
            foreignKey: 'userId',
            otherKey: 'notificationId',
            as: 'notifications',
        });

        this.hasMany(SuggestedDriver, {
            foreignKey: 'driverId',
            as: 'suggested'
        });

        this.hasMany(Rate, {
            foreignKey: 'driverId',
            as: 'rates'
        });
    }

    get cacheId() {
        return `driver:${this.id}`;
    }

    baseFormat() {
        return {
            id: this.id,

            firstName: this.firstName,
            lastName: this.lastName,
            number: this.number,
            isVerified: this.isVerified,
            isVolunteer: this.isVolunteer,
            email: this.email,
            role: this.role,
            photo: this.photo,
            homeAddress: this.homeAddress,
            city: this.city,
            online: this.online,
            state: this.state,
            rating: this.rating && this.rating.toPrecision(2),
            cost: this.cost,
            isStripe: !!this.accountId,
            lastOnlineDate: this.lastOnlineDate && this.lastOnlineDate.toISOString(),
            unreadCount: this.unreadCount,

            verifiedDate: this.verifiedDate && this.verifiedDate.toISOString(),
            driverDetail: this.driverDetail && this.driverDetail.baseFormat(),
            driverFare: this.driverFare && this.driverFare.baseFormat(),
            driverLocation: this.driverLocation && this.driverLocation.baseFormat(),
            ride: this.ride && this.ride.baseFormat(),

            standard: this.standard,
            canDriveChildren: this.canDriveChildren,
            drivePassengersWithNeeds: this.drivePassengersWithNeeds,
            needSomeAssistance: this.needSomeAssistance,
            foldingWheelChair: this.foldingWheelChair,
            electricWheelChair: this.electricWheelChair,

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

Driver.init(schema, options);

module.exports = Driver;