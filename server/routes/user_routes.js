const express = require('express');
const userController = require('../controllers/user_controller');

const router = express.Router();
// router.put('/*', userController.addTrips);
router.get('/trips', userController.findTripsByUser);

module.exports = router;