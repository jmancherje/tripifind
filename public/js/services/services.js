// these services can be loaded into any controller by including 'app.services' in the
// angular dependencies
angular.module('app.services',[])

// Include ActivitiesData in controller paramters to access these factory
// functions
.factory('ActivitiesData', function($http, $location, $state, store){
  // data stores all of the service functions
  var data = {};
  data.searchedCity = {};
  data.cityCache = {};

  // <h4>data.getActivities</h4>
  // Function that sends a get request to /activities/`cityname`
  // and retrieves 30 foursquare top rated activities for the city
  // returns a promise
  data.getActivities = function(city){
    //checks if the city has been searched before
    console.log('searching for city: ', city)
    if(data.searchedCity[city]){
      //sends a callback with the cache data
      return data.cityCache[city]
    }
    //call get request to our server, with the city
    return $http.get('/api/activities?city=' + city)
    .then(function(results){
      //our server calls a get request to the foursquare api
      //posts it to our database
      //gets data back out of our database and returns it
      console.log('getActivities success data: ', results)
      data.searchedCity[city] = true;
      data.cityCache[city] = results;
      return results;
    })
    .catch(function(err){
      console.log("Error Getting Activity Data: ", err)
    })
  };

  // <h4>data.getTrips</h4>
  // Function that sends a get request to /trips and retrieves
  // all trips from the db
  data.getTrips = function(){
    return $http.get('/api/trips')
    .then(function(results){
      return results;
    })
    .catch(function(err){
      console.log("Error Getting User Trip Data: ", err)
    })
  };

  // <h4>data.getUsersTrips</h4>
  // Function that retrieves all of one users stored trips
  // sends get request to /trips/`userId`
  data.getUsersTrips = function(userId, callback){
    $http.get('/api/trips/' + userId)
    .then(function(results){
      //our server calls a get request to the foursquare api
      //posts it to our database
      //gets data back out of our database and returns it
      console.log('Trip Results for ' +userId +': ' + results)
      return results;
    })
    .catch(function(err){
      console.log("Error Getting User Trip Data: ", err)
    })
  };

  // <h4>data.getIndividualTrip</h4>
  // pulls an trip from the db with the tripId
  // sends get request to /trips/`tripId`
  data.getIndividualTrip = function(tripId){
    $http.get('/api/trips/' + tripId)
    .then(function(results){
      // server calls a get request to the foursquare api
      // posts it to our database
      // gets data back out of our database and returns it
      console.log('Trip Result for ' + tripId +': ' + results)
      callback(results);
    })
    .catch(function(err){
      console.log("Error Getting Individual Trip Data: ", err)
    })
  };

  // <h4>data.createTrip</h4>
  // creates a trip and stores it to the db
  data.createTrip = function(tripData){
    //tripData is a JSON object
    var data = store.get('profile');
    var authId = data.user_id;
    var req = {
      method: 'POST',
      url: '/api/trips',
      headers: {
        auth: authId
      },
      data: tripData
    };

    $http(req)
      .then(function(res) {
        $state.go('trip', { id: res.data._id });
      })
      .catch(function(err) {
        console.log('error creating trip: ', err);
      })
  };

  // <h4>data.getTripActivities</h4>
  // retrieves an object containing all activities and data related
  // to the trip id
  data.getTripActivities = function(id, cb){
   return $http.get('/api/trips/' + id)
   .then(function(results){
    console.log('trip data: ', results)
     //our server calls a get request to the foursquare api
     //posts it to our database
     //gets data back out of our database and returns it
     cb(results);
   })
   .catch(function(err){
     console.log("Error Getting User Trip Data: ", err)
   })
 };

  return data;
})
