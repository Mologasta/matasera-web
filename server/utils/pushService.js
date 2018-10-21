const APN = require('apn');
const moment = require('moment');
const {DEVICE_TYPES} = require('../constants');
const {apn} = require('../../config');

const EXPIRATION_PERIOD = {days: 30};
const DEFAULT_BADGE = 0;

class PushService {
    constructor(config) {
        this.config = config;
        this.apnProvider = new APN.Provider({
            cert: apn.certificate,
            key: apn.key,
            production: apn.isProduction
        });
    }

    /**
     * Send push notifications
     * @param notification
     * @param devices
     * @return {Promise}
     */
    sendNotification(notification, devices) {
        const iosDevices = devices
            .filter(device => device.type === DEVICE_TYPES.IOS)
            .map(device => device.token);

        return this._sendAPN(notification, iosDevices);
    }

    /**
     * Send IOS push notifications
     * @param data
     * @param data.title
     * @param data.badge
     * @param data.payload
     * @param tokens
     * @private
     * @return {Promise}
     */
    _sendAPN(data, tokens) {
        const push = new APN.Notification();
        push.expiry = moment().add(EXPIRATION_PERIOD).unix();
        push.badge = data.badge || DEFAULT_BADGE;
        push.alert = data.title;
        push.sound = data.sound || 'default';
        push.payload = data.payload;
        push.topic = this.config.apn.topic;

        return this.apnProvider.send(push, tokens);
    }

}

module.exports = new PushService({apn});