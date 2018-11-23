const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.post('', controllers.execute('sns.confirm'));

module.exports = router;
