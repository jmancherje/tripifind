var db = require('../models/dbconnect.js');
var User = require('../models/users.js');
var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var request = require('request');
var bluebird = require('bluebird');

module.exports = {

  findTripsByUser: function(req, res, next) {
    const userId = req.headers.authid;
    Trips.find()
      .where('user_id').equals(userId)
      .then(function(trips) {
        res.status(200).send(trips);
      })
      .catch(function(error) {
        console.error('error finding users trips', error);
      })
  }

};

     