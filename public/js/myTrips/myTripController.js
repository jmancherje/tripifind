angular.module('app.mytrips', ['app.services'])

.controller('MyTripsController', function ($scope, $http, ActivitiesData, $state, store, $location) {

  $scope.trips = [];
  $scope.showTrips = false;


  $scope.viewTrip = function(index) {
    // $state.go('trip')
    $location.path('/trip/' + $scope.trips[index]._id)
  }

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
        $scope.showTrips = true;
      })
      .catch(function(err) {
        console.log('error fetching trips: ', err)
      })
  }

  init();


})