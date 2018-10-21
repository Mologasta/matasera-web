const RIDER_CHARACTERISTICS = require('./riderCharacteristics');

module.exports = {
    [RIDER_CHARACTERISTICS.NEED_HELP_GETTING_OUT]: ['helpGettingOut'],
    [RIDER_CHARACTERISTICS.FOLDING_WHEELCHAIR]: ['notStandard','foldingWheelchair'],
    [RIDER_CHARACTERISTICS.ELECTRIC_WHEELCHAIR]: ['notStandard','electricWheelchair'],
    [RIDER_CHARACTERISTICS.ADVANCED_MEDICAL_NEEDS]: ['notStandard','advancedMedicalNeeds']
};