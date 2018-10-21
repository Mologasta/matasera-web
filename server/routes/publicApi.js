const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/swagger/config', controllers.staticFiles.swaggerConfig);

module.exports = router;
