const DRIVER_QUALIFICATION = require('./driversQualifications');

module.exports = {
    [DRIVER_QUALIFICATION.All]: [],
    [DRIVER_QUALIFICATION.STANDARD]: ['onlyStandard'],
    [DRIVER_QUALIFICATION.CAN_DRIVE_CHILDREN]: ['onlyStandard', 'driveChildren'],
    [DRIVER_QUALIFICATION.HELP_GETTING_OUT]: ['onlyStandard', 'helpGettingOut'],
    [DRIVER_QUALIFICATION.MEDICAL]: ['notStandard'],
    [DRIVER_QUALIFICATION.FOLDING_WHEELCHAIR]: ['notStandard', 'foldingWheelchair'],
    [DRIVER_QUALIFICATION.ELECTRIC_WHEELCHAIR]: ['notStandard', 'electricWheelchair'],
    [DRIVER_QUALIFICATION.ADVANCED_MEDICAL_NEEDS]: ['notStandard', 'advancedMedicalNeeds'],
};