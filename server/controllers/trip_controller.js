var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var h = require('../helpers/filter_json.js');
var request = require('request');

var FOURSQUARE_APIKEY = process.env.FOURSQUARE_API;
var FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET;

module.exports = {
  saveActivities: function(req, res, next) {
    var activities = req.body.activities;

    TripItems.create(activities, function(err, results) {
      if (err) {
        console.error(err);
      } else {
        var activityIds = results.map(function(activity) {
          return activity._id;
        })
        req.body.activityIds = activityIds;
        next();
      }
    });

  },

  createTrip: function(req, res, next) {
    var trip = {
      name: req.body.name,
      destination: [req.body.city, req.body.state],
      image: req.body.image,
      activities: req.body.activityIds,
      location: {
        ne: {
          lat: req.body.location.ne.lat,
          lng: req.body.location.ne.lng
        },
        sw: {
          lat: req.body.location.sw.lat,
          lng: req.body.location.ne.lng
        },
        center: {
          lat: req.body.location.center.lat,
          lng: req.body.location.center.lng
        }
      }
    };

    Trips.create(trip, function(err, results) {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(results);
      }
    })
  }
}