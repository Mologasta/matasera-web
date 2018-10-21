const conf = require('../../config');
const stripe = require('stripe')(conf.stripe.apiKey);

module.exports = stripe;