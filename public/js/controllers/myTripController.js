angular.module('app.mytrips', ['app.services'])

// ActivitiesData is a factory/service laoded from app.services
// $location is for redirecting
.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location, store) {

  $scope.trips = [];

  function init() {
    var authId = store.get('profile').user_id;
    var request = {
      type: 'GET',
      url: '/api/users/trips',
      headers: {
        authid: authId
      }
    }

    console.log('request: ', request);

    $http(request)
      .then(function(trips) {
        $scope.trips = trips;
        console.log('got all trips:', trips);
      })
  }

  init();


})