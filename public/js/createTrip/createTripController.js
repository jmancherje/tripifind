
//  This controller applies to the createTrip.html
angular.module('app.create', ['app.services'])

//  Factory functions are loaded in in 'ActivitiesData' from 'app.services'
.controller('CreateTripController', function ($scope, $http, ActivitiesData) {
  
  // $scope.formCompleted is a variable to determine if the form is completed
  // if it's false, the form with show
  // if true, the form will hide and the right side of page will populate
  $scope.formCompleted = false;
  $scope.cityLocation = {};
  $scope.address = '';
  $scope.autoCompleteOptions = {
    componentRestrictions: { country : 'USA' },
    types: ['(cities)'] 
  }
  
  // <h3>startItinerary is a function to: </h3>
    // 1. hide the form
    // 2. trigger the search
  $scope.startItinerary = function() {
    if (!$scope.places || !$scope.itineraryName) {
      return;
    } else {
      if (typeof $scope.places === 'object') {
        $scope.address = $scope.places.formatted_address;
      } else {
        $scope.address = $scope.places
      }
      // $scope.formCompleted set to true removes the form and begins populating 
      // the rest of the page.
      $scope.formCompleted = true;
      // $http.get('/api/activities/' + $scope.city + ',' + $scope.state)
      $http.get('/api/activities/' + encodeURI($scope.address))
        .success(function (data) {
          // $scope.activities is an array of all the activities found by the api
          // at the given destination
          var cityData = JSON.parse(data);
          $scope.cityLocation = cityData.location;
          $scope.activities = cityData.activities;
        });
    }
  };

  // $scope.itinerary is an emtpy array that will contain all the activities the user will add
  // to their trip
  $scope.itinerary = []; 

  // <h4>$scope.addToTrip</h4> 
  // Is a function that that adds an activity from the api to the users itinerary
  $scope.addToTrip = function(){
    // The first item added to the itinerary will be the item whose photo is stored with the trip
    if ($scope.itinerary.length === 0) {
      $scope.itineraryImage = this.activity.photo;
    }
    $scope.itinerary.push(this.activity);
  };

  // <h4>$scope.removeFromTrip</h4>
  // Is a function that removes an item from the users itinerary
  $scope.removeFromTrip = function () {
    var index = $scope.itinerary.indexOf(this.activity);
    $scope.itinerary.splice(index, 1);
  };

  // <h4>$scope.saveItinerary</h4>
  // Is a function that creates an object containing all the relevant information to a users itinerary
  // the object is sent to the server and DB through the factory function ActivitiesData.createTrip
  // see the documentation on services.js for more information.
  $scope.saveItinerary = function () {
    // POST request to /trips with $scope.itinerary 
    const city = $scope.address.split(', ')[0]
    const state = $scope.address.split(', ')[1]
    var tripObj = {
      name: $scope.itineraryName,
      city: city,
      state: state,
      address: $scope.address,
      activities: $scope.itinerary,
      image: $scope.itineraryImage,
      location: $scope.cityLocation
    };
    var trip = JSON.stringify(tripObj);
    ActivitiesData.createTrip(trip);
  };

});