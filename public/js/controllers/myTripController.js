angular.module('app.mytrips', ['app.services'])

// ActivitiesData is a factory/service laoded from app.services
// $location is for redirecting
.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location) {

  //<h4>ActivitiesData.getTrips</h4>
  // Is a function to get all trips to populate myTrips page
  // trips are stored in an $scope.tripResults as an array
  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
  });

  // <h4>$scope.viewTrip</h4>
  // Is a function called when a specific playlist/trip is clicked on
  $scope.viewTrip = function (index) {
    // $scope.id stores the _.id for the specific trip
    $scope.id = $scope.tripResults[index]._id;
    $location.path('/trip/' + $scope.id);
  };
})