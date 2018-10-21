const express = require('express');
const controllers = require('../controllers');
const router = express.Router();
const passportWrapper = require('../utils/passportWrapper');

router
    .route('/:version/riders/sessions')
    .post(controllers.execute('riderSessions.signIn'))
    .put(controllers.execute('riderSessions.refresh'))
    .delete(passportWrapper.riderAuthHandler, controllers.execute('riderSessions.signOut'));

router
    .route('/:version/drivers/sessions')
    .post(controllers.execute('driverSessions.signIn'))
    .put(controllers.execute('driverSessions.refresh'))
    .delete(passportWrapper.driverAuthHandler, controllers.execute('driverSessions.signOut'));

router
    .route('/:version/admins/sessions')
    .post(controllers.execute('adminSessions.signIn'))
    .put(controllers.execute('adminSessions.refresh'))
    .delete(passportWrapper.adminAuthHandler, controllers.execute('adminSessions.signOut'));

router
    .route('/:version/emails')
    .post(controllers.execute('common.checkEmailAvailability'));

router
    .route('/:version/notifications')
    .get(passportWrapper.createAuthHandler(), controllers.execute('notifications.getList'));

router
    .route('/:version/notifications/:notificationId')
    .delete(passportWrapper.createAuthHandler(), controllers.execute('notifications.delete'));


router
    .route('/:version/rides/:rideId')
    .get(passportWrapper.createAuthHandler(), controllers.execute('rides.getRide'));

/****************************ADMINS SECTION*****************************/
router
    .route('/:version/admins/riders')
    .get(passportWrapper.adminAuthHandler, controllers.execute('adminRiders.getList'));

router
    .route('/:version/admins/me')
    .get(passportWrapper.adminAuthHandler, controllers.execute('admins.getSelf'));

router
    .route('/:version/admins/me/cards')
    .put(passportWrapper.adminAuthHandler, controllers.execute('admins.setCard'));

router
    .route('/:version/admins/me/password')
    .put(passportWrapper.adminAuthHandler, controllers.execute('admins.updatePassword'));

router
    .route('/:version/admins/riders/fee')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminRiders.getFee'))
    .put(controllers.execute('adminRiders.setFee'));

router
    .route('/:version/admins/riders/requests')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminRiders.requestsList'));

router
    .route('/:version/admins/riders/requests/:requestId')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminRiders.getRequest'))
    .patch(controllers.execute('adminRiders.acceptRequest'))
    .delete(controllers.execute('adminRiders.declineRequest'));

router
    .route('/:version/admins/riders/:riderId')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminRiders.getRider'))
    .patch(controllers.execute('adminRiders.verifyRider'))
    .delete(controllers.execute('adminRiders.delete'));

router
    .route('/:version/admins/riders/:riderId/block')
    .patch(passportWrapper.adminAuthHandler, controllers.execute('adminRiders.blockRider'));

router
    .route('/:version/admins/riders/:riderId/unblock')
    .patch(passportWrapper.adminAuthHandler, controllers.execute('adminRiders.unblockRider'));

router
    .route('/:version/admins/drivers')
    .get(passportWrapper.adminAuthHandler, controllers.execute('adminDrivers.getList'));

router
    .route('/:version/admins/drivers/:driverId')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminDrivers.getDriver'))
    .patch(controllers.execute('adminDrivers.verifyDriver'))
    .put(controllers.execute('adminDrivers.updateDriver'))
    .delete(controllers.execute('adminDrivers.delete'));

router
    .route('/:version/admins/drivers/:driverId/rides')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('rides.getRides'));

router
    .route('/:version/admins/drivers/:driverId/rides/:rideId')
    .all(passportWrapper.adminAuthHandler)
    .get(controllers.execute('adminDrivers.getRide'));

router
    .route('/:version/admins/drivers/:driverId/block')
    .patch(passportWrapper.adminAuthHandler, controllers.execute('adminDrivers.blockDriver'));

router
    .route('/:version/admins/drivers/:driverId/unblock')
    .patch(passportWrapper.adminAuthHandler, controllers.execute('adminDrivers.unblockDriver'));

/****************************RIDERS SECTION*****************************/
router
    .route('/:version/riders')
    .post(controllers.execute('riders.signUp'));

router
    .route('/:version/riders/passwords/reset')
    .put(controllers.execute('riders.updatePassword'));

router
    .route('/:version/riders/:riderId')
    .get(passportWrapper.riderAuthHandler, controllers.execute('riders.getRider'));

router
    .route('/:version/riders/:riderId/preferences')
    .patch(passportWrapper.riderAuthHandler, controllers.execute('riders.updatePreferences'));

router
    .route('/:version/riders/:riderId/device')
    .post(passportWrapper.riderAuthHandler, controllers.execute('riders.addDevice'));

router
    .route('/:version/riders/:riderId/rides')
    .post(passportWrapper.riderAuthHandler, controllers.execute('riders.searchRide'));

router
    .route('/:version/riders/:riderId/debt')
    .patch(passportWrapper.riderAuthHandler, controllers.execute('riders.payDebt'));

router
    .route('/:version/riders/:riderId/rides/:rideId/cancel')
    .patch(passportWrapper.riderAuthHandler, controllers.execute('riders.cancelRide'));

router
    .route('/:version/riders/:riderId/rides/:rideId/report')
    .post(passportWrapper.riderAuthHandler, controllers.execute('riders.sendReport'));

router
    .route('/:version/riders/:riderId/rides/:rideId/select')
    .patch(passportWrapper.riderAuthHandler, controllers.execute('riders.selectDriver'));

router
    .route('/:version/riders/:riderId/rides/:rideId/rate')
    .post(passportWrapper.riderAuthHandler, controllers.execute('riders.rateDriver'));

router
    .route('/:version/riders/:riderId/location')
    .put(passportWrapper.riderAuthHandler, controllers.execute('riders.trackLocation'));

router
    .route('/:version/riders/:riderId/cards')
    .post(passportWrapper.riderAuthHandler, controllers.execute('riders.addCard'));

router
    .route('/:version/riders/:riderId/cards/:cardId')
    .all(passportWrapper.riderAuthHandler)
    .patch(controllers.execute('riders.setDefault'))
    .delete(controllers.execute('riders.deleteCard'));

/****************************DRIVERS SECTION*****************************/
router
    .route('/:version/drivers')
    .post(controllers.execute('drivers.signUp'));

router
    .route('/:version/drivers/passwords/reset')
    .put(controllers.execute('drivers.updatePassword'));

router
    .route('/:version/drivers/:driverId')
    .all(passportWrapper.driverAuthHandler)
    .get(controllers.execute('drivers.getDriver'));

router
    .route('/:version/drivers/:driverId/stripe')
    .all(passportWrapper.driverAuthHandler)
    .patch(controllers.execute('drivers.linkStripeAccount'));

router
    .route('/:version/drivers/:driverId/device')
    .post(passportWrapper.driverAuthHandler, controllers.execute('drivers.addDevice'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/report')
    .post(passportWrapper.driverAuthHandler, controllers.execute('drivers.sendReport'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/accept')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.acceptRide'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/arrived')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.setArrivedState'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/continue')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.startRide'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/decline')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.declineRide'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/cancel')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.cancelRide'));

router
    .route('/:version/drivers/:driverId/rides/:rideId/end')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.endRide'));

router
    .route('/:version/drivers/:driverId/photo')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.updatePhoto'));

router
    .route('/:version/drivers/:driverId/location')
    .put(passportWrapper.driverAuthHandler, controllers.execute('drivers.trackLocation'));

router
    .route('/:version/drivers/:driverId/status')
    .patch(passportWrapper.driverAuthHandler, controllers.execute('drivers.changeState'));

router
    .route('/:version/drivers/:driverId/volunteer')
    .patch(passportWrapper.driverAuthHandler, controllers.execute('drivers.changeVolunteerState'));

router
    .route('/:version/drivers/:driverId/fares')
    .all(passportWrapper.driverAuthHandler)
    .put(controllers.execute('drivers.updateFares'));

/****************************VERIFICATION SECTION***********************/
router
    .route('/:version/verification')
    .post(controllers.execute('verification.sendVerificationCode'));

router
    .route('/:version/verification/code')
    .post(controllers.execute('verification.validateCode'));

router
    .route('/:version/verification/reset')
    .post(controllers.execute('verification.resetPasswordCode'));

module.exports = router;