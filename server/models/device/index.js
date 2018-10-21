const { Model } = require('sequelize');

const options = require('./options');
const schema = require('./schema');

class Device extends Model {
    static associate({ Rider, Driver, DeviceDriver, DeviceRider }) {
        this.belongsToMany(Rider, {
            through: DeviceRider,
            foreignKey: 'deviceId',
            otherKey: 'userId',
            as: 'riders',
        });

        this.belongsToMany(Driver, {
            through: DeviceDriver,
            foreignKey: 'deviceId',
            otherKey: 'userId',
            as: 'drivers',
        });
    }
}

Device.init(schema, options);

module.exports = Device;
