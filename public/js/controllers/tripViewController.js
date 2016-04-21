angular.module('app.trip', ['app.services'])

// ActivitiesData is a factory/service loaded from app.services
// $routeParams is used to get the trip mongoose _.id
.controller('TripController', function ($scope, $http, ActivitiesData, $stateParams) {

  // $scope.id stores the trip mongoose _.id
  $scope.id = $stateParams.id;
  $scope.map = { center: { latitude: 37.7749, longitude: -122.4192 }, zoom: 14 };
  // ActivitiesData.getTripActivities returns and object containing
  // the details for each activity stored in this trip
  // $scope.activities stores an array of all activities
  // $scope.name stores the name of the trip/playlist
  // $scope.destination stores the destionation of the trip
  $scope.refreshMap = false;
  ActivitiesData.getTripActivities($scope.id, function (tripObj) {
    $scope.dataLoaded = true;
    console.log('tripobj ', tripObj);
    $scope.activities = tripObj.data.list;
    $scope.name = tripObj.data.name;
    $scope.destination = tripObj.data.destination;
    $scope.map = { bounds: { 
        southwest: {
          latitude: tripObj.data.trip.location.sw.lat,
          longitude: tripObj.data.trip.location.sw.lng
        },
        northeast: {
          latitude: tripObj.data.trip.location.ne.lat,
          longitude: tripObj.data.trip.location.ne.lng
        }
      },
      center: {
        latitude: tripObj.data.trip.location.center.lat,
        longitude: tripObj.data.trip.location.center.lng
      }
    }
    $scope.refreshMap = true;
  });

})