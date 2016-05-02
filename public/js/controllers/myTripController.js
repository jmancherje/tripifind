angular.module('app.mytrips', ['app.services'])

.controller('MyTripsController', function ($scope, $http, ActivitiesData, $location, store) {

  $scope.trips = [];

  function init() {
    // TODO: abstract this functionality / HTTP request to service
    var authId = store.get('profile').user_id;
    var request = {
      type: 'GET',
      url: '/api/users/trips',
      headers: {
        authid: authId
      }
    }

    $http(request)
      .then(function(res) {
        $scope.trips = res.data;
      })
  }

  init();


})