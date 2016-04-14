const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();
router.get('/*', controller.fetchCityData);

module.exports = router;