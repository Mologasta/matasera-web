const client = require('../utils/stripe');
const uuid = require('uuid');

class StripeService {

    /**
     * Create stripe customer
     * @param token
     */
    static createCustomer(token) {
        return client.customers.create({
            source: token,
        });
    }

    /**
     * Create stripe charge
     * @param customerId
     * @param cardId
     * @param amount
     */
    static createCharge(customerId, cardId, amount) {
        return client.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customerId,
            source: cardId,
            transfer_group: uuid.v4(),
            description: 'Charge for the ride'
        });
    }

    /**
     * Transfer funds to drivers stripe account
     * @param amount
     * @param accountId
     * @param transferGroup
     */
    static makeTransfer(amount, accountId, transferGroup) {
        return client.transfers.create({
            amount: amount,
            currency: 'usd',
            destination: accountId,
            transfer_group: transferGroup,
            description: 'Transfer funds for the ride'
        });
    }

    /**
     * Set default source
     * @param customerId
     * @param cardId
     */
    static setDefaultSource(customerId, cardId) {
        return client.customers.update(customerId, {
            default_source: cardId,
        });
    }

    /**
     * Add customers card to stripe
     * @param customerId
     * @param token
     */
    static createCard(customerId, token) {
        return client.customers.createSource(customerId, {
            source: token,
        });
    }

    /**
     * Delete customers card from stripe
     * @param customerId
     * @param cardId
     */
    static deleteCard(customerId, cardId) {
        return client.customers.deleteCard(customerId, cardId);
    }
}

module.exports = StripeService;