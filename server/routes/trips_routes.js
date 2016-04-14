const express = require('express');
const controller = require('../controllers/controller.js');

const router = express.Router();
router.get('/', controller.getAllTrips);
router.post('/', controller.createTrip);
router.get('/:id', controller.accessTrip);

module.exports = router;