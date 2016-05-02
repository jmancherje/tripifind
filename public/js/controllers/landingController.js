angular.module('app.landing', ['app.services'])

// ActivitiesData a factory/service stored in app.services
// $location is for redirecting
.controller('LandingController', function ($scope, $http, ActivitiesData, $state) {

  // <h4>ActivitiesData.getTrips()</h4>
  // function that gets all the trips to populate the landing page
  // trips are stored in $scope.tripResults
  ActivitiesData.getTrips()
  .then(function(results){
    $scope.tripResults = results.data;
  })

  // Redirect to view playlist information
  $scope.viewTrip = function (index) {
    const id = $scope.tripResults[index]._id;
    $state.go('trip', { id: id })
  };

});