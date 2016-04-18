const express = require('express');
const controller = require('../controllers/controller.js');
const redis = require('../middleware/cache');

const router = express.Router();
// router.get('/:city', controller.fetchCityData);
router.get('/:city', redis.checkForCity, controller.fetchCityData, redis.cacheCity);

module.exports = router;