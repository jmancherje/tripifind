
//  This controller applies to the createTrip.html
angular.module('app.create', ['app.services'])

//  Factory functions are loaded in in 'ActivitiesData' from 'app.services'
.controller('CreateTripController', function ($scope, $http, ActivitiesData) {
  
  // $scope.formCompleted is a variable to determine if the form is completed
  // if it's false, the form with show
  // if true, the form will hide and the right side of page will populate
  $scope.formCompleted = false;
  
  // <h3>startItinerary is a function to: </h3>
    // 1. hide the form
    // 2. trigger the search
  $scope.startItinerary = function () {
    console.log('start itinerary');
    // this if block ensures that the Itinerary Name City and State are present 
    // before submitting the form
    if (!$scope.itineraryName || !$scope.city || !$scope.state) {
      return;
    } else {
      // $scope.formCompleted set to true removes the form and begins populating 
      // the rest of the page.
      $scope.formCompleted = true;
      $http.get('/api/activities/' + $scope.city + ',' + $scope.state)
        .success(function (data) {
          // $scope.activities is an array of all the activities found by the api
          // at the given destination
          $scope.activities = data;
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
    var activityIds = $scope.itinerary.map(function (activity) {
      return activity._id;
    });
    console.log("ACTIVITY:", activityIds);
    var tripObj = {
      name: $scope.itineraryName,
      city: $scope.city,
      state: $scope.state,
      activities: activityIds,
      image: $scope.itineraryImage
    };
    var trip = JSON.stringify(tripObj);
    ActivitiesData.createTrip(trip);
  };

});