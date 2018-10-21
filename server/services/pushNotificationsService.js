const logger = require('../utils/logger');
const { Driver, Rider, Notification } = require('../models');
const pushService = require('../utils/pushService');

class PushNotificationsService {

    /**
     * Send raw notification
     * @param notification
     * @param role
     * @param recipientId
     * @param ride
     */
    static send(notification, role, recipientId, ride) {
        let push = {
            title: notification.title,
            payload: {
                rideId: ride.id,
                type: notification.type,
                message: notification.message,
            }
        };
        return PushNotificationsService
            .countUnreadNotifications(role, recipientId)
            .then(count => push.badge = count)
            .then(() => {
                return role
                    .scope('withDevices')
                    .findById(recipientId);
            })
            .then(user => {
                if (!user || !user.devices.length) {
                    logger.log('info', 'No devices');
                    return Promise.resolve();
                }

                return pushService.sendNotification(push, user.devices);
            })
            .then(pushResponse => logger.log('info', 'PushResponse', pushResponse));
    }

    /**
     * Get count of unread notifications
     * @param {*} role
     * @param recipientId
     */
    static countUnreadNotifications(role, recipientId) {
        const scopes = ['unread'];

        if(role === Driver) {
            scopes.push({ method: ['byDriver', recipientId]});
        }
        if(role === Rider) {
            scopes.push({ method: ['byRider', recipientId]});
        }

        return Notification
            .scope(scopes)
            .count();
    }

}

module.exports = PushNotificationsService;