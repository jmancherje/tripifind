const express = require('express');
const controller = require('../controllers/controller.js');
const tripController = require('../controllers/trip_controller.js');
const jwtCheck = require('../middleware/auth').jwtCheck;

const router = express.Router();
router.get('/', controller.getAllTrips);
router.post('/', jwtCheck, tripController.saveActivities, tripController.createTrip);
router.get('/:id', controller.accessTrip);

module.exports = router;