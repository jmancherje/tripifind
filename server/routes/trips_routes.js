const express = require('express');
const controller = require('../controllers/controller.js');
const tripController = require('../controllers/trip_controller.js');

console.log('typeof methods: ', tripController);

const router = express.Router();
router.get('/', controller.getAllTrips);
router.post('/', tripController.saveActivities, tripController.createTrip);
router.get('/:id', controller.accessTrip);

module.exports = router;