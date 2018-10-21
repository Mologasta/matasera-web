const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class UpdateRequest extends Sequelize.Model {

    static associate({ Rider }) {

        this.belongsTo(Rider, {
            foreignKey: 'riderId',
            as: 'rider',
        });
    }

    baseFormat() {
        return {
            id: this.id,

            isAdult: this.isAdult,
            characteristics: this.characteristics,
            smokingPreference: this.smokingPreference,
            ridePreference: this.ridePreference,
            rider: this.rider && this.rider.baseFormat(),

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

UpdateRequest.init(schema, options);

module.exports = UpdateRequest;