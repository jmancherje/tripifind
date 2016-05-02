var db = require('../models/dbconnect.js');
var User = require('../models/users.js');
var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var request = require('request');
var bluebird = require('bluebird');

module.exports = {

  findAllUserTrips: function(req, res, next) {
    const userId = req.headers.userId;
    User.findOne({ auth_id: userId }, function(err, user) {
      if (err) { 
        console.log("can't find user, error:", err)
        return err; 
      } else {
        console.log("found user: ", user);
        return user;
      }
    })
    .then(function(user){
      return Trips.find({
        '_id': {
          $in: user.trips
        }
      })
    })
    .then(function(trips) {
      res.status(200).send(trips);
    })
    .catch(function(error) {
      console.error('error finding users trips', error);
    })
  }
};

     