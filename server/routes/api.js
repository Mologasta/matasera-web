const express = require('express');
const controllers = require('../controllers');
const router = express.Router();
const passportWrapper = require('../utils/passportWrapper');

router
    .route('/:version/sessions')
    .post(controllers.execute('sessions.signIn'))
    .put(controllers.execute('sessions.refresh'))
    .delete(passportWrapper.userAuthHandler, controllers.execute('sessions.signOut'));

/****************************USERS SECTION*****************************/
router
    .route('/:version/users')
    .get(passportWrapper.userAuthHandler, controllers.execute('users.getUsers'))
    .post(controllers.execute('users.signUp'));

router
    .route('/:version/users/:userId')
    .get(passportWrapper.userAuthHandler, controllers.execute('users.getUser'));

/****************************IMAGES SECTION***********************/
router
    .route('/:version/images')
    .get(passportWrapper.userAuthHandler, controllers.execute('images.getImages'))
    .post(passportWrapper.userAuthHandler, controllers.execute('images.upload'));

module.exports = router;
