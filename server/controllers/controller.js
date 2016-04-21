// var User = require('../models/users.js');
var Trips = require('../models/trips.js');
var TripItems = require('../models/tripItem.js');
var request = require('request');

var FOURSQUARE_APIKEY = process.env.FOURSQUARE_API;
var FOURSQUARE_SECRET = process.env.FOURSQUARE_SECRET;

// put in helper
var filterTripData = function(responseObj) {
  var cityData = {};
  var activitiesRaw = responseObj.groups[0].items;
  cityData.location = responseObj.suggestedBounds;
  cityData.location.center = responseObj.geocode.center;
  cityData.activities = activitiesRaw.reduce(function(totalData, item) {
    var location = item.venue.location;
    var photoURL = item.venue.featuredPhotos.items[0];
    var notes = item.tips === undefined ? '' : item.tips[0].text; 
    var tripItem = {
      name: item.venue.name,
      address: location.address + ', ' + location.city + ', ' + location.state + ' - ' + location.cc,
      city: location.city,
      notes: notes,
      category: item.venue.categories[0].name,
      rating: item.venue.rating,
      photo: photoURL.prefix + '300x300' + photoURL.suffix,
      url: item.venue.url,
      api: {
        name: 'foursquare',
        id: item.venue.id,
        website: 'https://foursquare.com/venue/' + item.venue.id
      },
      location: {
        longitude: location.lng,
        latitude: location.lat,
        formattedAddress: location.formattedAddress
      }
    };
    totalData.push(tripItem); 
    return totalData;
  }, []);
  console.log('fetched and filtered city data: ', cityData);
  return cityData;
};


// put in helper
// <h4> parseCityName </h4>
// Accepts the decoded request url, reformats it and 
// returns a string of the city name 
var parseCityName = function(cityRequest) {
    var cityLowercase = cityRequest.split(',')[0];
    var city = '';
    if (cityLowercase.indexOf(' ') > 0) {
      var splitCity = cityLowercase.split(' ');
      var firstCityHalf = splitCity[0][0].toUpperCase() + splitCity[0].slice(1);
      var secondCityHalf = splitCity[1][0].toUpperCase() + splitCity[1].slice(1);
      city += firstCityHalf + ' ' + secondCityHalf;
    } else {
      city += cityLowercase[0].toUpperCase() + cityLowercase.slice(1);
    }
    return city;
}

module.exports = {
  //<h4> searchStoredData </h4> 
  // Parses the city name from the request url param and 
  // checks to see if our database containss that city.
  // If we have a record for that city that is sent in the response, 
  // otherwise fetch directly from the foursquare API using <h4> fetchCityData </h4> 
  // and response with the API data
  // Method: GET
  // Route : /activities/*'

  searchStoredData: function(req, res, next) {
    var city = parseCityName(decodeURI(req.url.split('/')[2]));
    TripItems.find({ city: city }, function(err, list) {
      if (list.length < 1) {
        // if (list.length < 1) {
        // City not cached; fetching data
        console.log("City not cached; fetching data");
        next();
      }
      else if (!err) {
        // Pulling list from DB
        console.log("Pulling list from DB");
        res.send(list);
      } else {
        res.send(err);
      }
    });
  },

  //<h4> fetchCityData </h4> 
  // Fetches data from the Foursquare API if the data is not 
  // already stored in our database
  // Method: GET
  // Route : /activities/*'
  fetchCityData: function(req, res, next) {
    // if request is already cached, skip api call
    console.log('fetching data for ', req.params.city)
    if (req.cached === true) {
      console.log('already cached..')
      next();
    }
    // return;
    var cityState = encodeURI(req.params.city.toLowerCase());
    return request('https://api.foursquare.com/v2/venues/explore?client_id='+FOURSQUARE_APIKEY+'&client_secret='+FOURSQUARE_SECRET+'&v=20130815&near='+cityState+'&venuePhotos=1', function(err, response, body) {
      // prevent server crashing when responseObj is undefined
      if (!err && JSON.parse(body).meta.code === 200) { 
        // attach filtered data to request object, send to redis
        req.filteredData = filterTripData(JSON.parse(body).response);
        next();

        // res.status(200).json(results)
        // module.exports.saveCityData(filteredResults).then(function(results, err) {
        //   if (err) {
        //     res.send(err);
        //   }
        //   // res.send(JSON.stringify(results));
        //   next();
        // });
      } else {
        res.status(400).send(err);
      }
    });
  }, 


  //<h4>  saveCityData </h4> 
  // Adds the searched city to the database
  // Model: TripItems
  saveCityData: function(results, next) {
    return TripItems.create(results, function(err, results) {
      if (err) {
        console.log(err);
      }
    });    
  },

  //<h4> createTrip </h4> 
  // Accepts a JSON object to be stored.
  // Example : tripObj = {
    //   name: name,
    //   city: city,
    //   state: state,
    //   activities: activities,
    //   image: image
    // };
  // Method: PUT
  // Route : /trips

  createTrip: function(req, res, next) {
    var playlist = {
      name: req.body.name,
      destination: [req.body.city, req.body.state],
      activities: req.body.activities,
      image: req.body.image
    };
    Trips.create(playlist, function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    });
  },

  //<h3> GetAllTrips </h3> 
  // Returns a JSON of all the data present in the database
  // Method: Get
  // Route : /trips
  getAllTrips: function (req, res, next) {
    console.log('getting all trips...')
    Trips.find(function (err, results) {
      res.json(results)
    });
  },

  //<h3> accessTrip </h3> 
    // Returns a trip object with name, destination, and actitivites properties
    // Acitivties is an array
    // Method: Get
    // Route : /trips/*
  accessTrip: function(req, res, next) {
    var tripId = req.params.id;
    var fullActivities = {};
    fullActivities.list = [];
    Trips.findById({ _id: tripId }, function(err, trip) {
      if (err) { 
        console.log("findById error", err)
        return err; 
      } else {
        fullActivities.trip = trip;
        return trip;
      }
    })
    .then(function(trip){
      fullActivities.name = trip.name;
      fullActivities.destination = trip.destination;
      var activityLength = trip.activities.length;
      trip.activities.forEach(function(tripId){
        TripItems.findById({ _id: tripId }, function(err, trip) {
          if (err) {
            console.log("Error finding TripItems by tripId", err)
          } else {
            fullActivities.list.push(trip);
            if(activityLength === fullActivities.list.length){
              res.status(200).send(fullActivities);
            } 
          }
        });
      });
    });
  }
};