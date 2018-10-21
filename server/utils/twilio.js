const Twilio = require('twilio');
const {twilio} = require('../../config');

module.exports = new Twilio(twilio.accountSid, twilio.authToken);
