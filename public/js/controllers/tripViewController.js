angular.module('app.trip', ['app.services'])

// ActivitiesData is a factory/service loaded from app.services
// $routeParams is used to get the trip mongoose _.id
.controller('TripController', function ($scope, $http, ActivitiesData, $routeParams) {

  // $scope.id stores the trip mongoose _.id
  $scope.id = $routeParams.id;
  var initMap = function() {
    var div = document.getElementById('map');
      if (!div) {
        return
      } else {
        map = new google.maps.Map(div, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
  }

  // ActivitiesData.getTripActivities returns and object containing
  // the details for each activity stored in this trip
  // $scope.activities stores an array of all activities
  // $scope.name stores the name of the trip/playlist
  // $scope.destination stores the destionation of the trip
  ActivitiesData.getTripActivities($scope.id, function (tripObj) {
    console.log('tripobj ', tripObj);
    $scope.activities = tripObj.data.list;
    $scope.name = tripObj.data.name;
    $scope.destination = tripObj.data.destination;
  });

  $http.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyB2d3ZacGZmT2LPp401fbm4kzPIGUUGvSM&callback=initMap')
    .success(function() {
      console.log('success getting map')
    })

})