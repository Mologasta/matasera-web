const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class Debt extends Sequelize.Model {

    static associate({ Rider, Transfer }) {
        this.belongsTo(Rider, {
            foreignKey: 'riderId',
            as: 'rider',
        });

        this.belongsTo(Transfer, {
            foreignKey: 'transferId',
            as: 'transfer',
        });
    }

    baseFormat() {
        return {
            id: this.id,

            rider: this.rider && this.rider.baseFormat(),
            amount: this.amount,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

Debt.init(schema, options);

module.exports = Debt;