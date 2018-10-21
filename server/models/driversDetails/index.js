const Sequelize = require('sequelize');
const options = require('./options');
const schema = require('./schema');

class DriverDetail extends Sequelize.Model {

    baseFormat() {
        return {
            id: this.id,

            driversLicenceExpDate: this.driversLicenceExpDate,
            paramedicLicenceExpDate: this.paramedicLicenceExpDate,
            vehicleRegistrationExpDate: this.vehicleRegistrationExpDate,
            model: this.model,
            licencePlate: this.licencePlate,
            numberOfSeats: this.numberOfSeats,
            placeForLuggage: this.placeForLuggage,
            smoking: this.smoking,
            babyChair: this.babyChair,
            pets: this.pets,
            taxi: this.taxi,

            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        };
    }
}

DriverDetail.init(schema, options);

module.exports = DriverDetail;