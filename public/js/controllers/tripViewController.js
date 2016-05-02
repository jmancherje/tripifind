angular.module('app.trip', ['app.services'])


// ActivitiesData is a factory/service loaded from app.services
// $routeParams is used to get the trip mongoose _.id
.controller('TripController', function ($scope, $http, ActivitiesData, $stateParams, $document) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  $scope.activities = [];

  function renderMap() {
    if ($scope.activities.length === 0) {
      return;
    }
    var waypts = [];
    for (var i = 1; i < $scope.activities.length - 1; i++) {
      waypts.push({
        location: $scope.activities[i].address,
        stopover: true
      });
    }

    directionsService.route({
      origin: $scope.activities[0].address,
      destination: $scope.activities[$scope.activities.length - 1].address,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        // var summaryPanel = document.getElementById('directions-panel');
        // summaryPanel.innerHTML = '';
        // // For each route, display summary information.
        // for (var i = 0; i < route.legs.length; i++) {
        //   var routeSegment = i + 1;
        //   summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
        //       '</b><br>';
        //   summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        //   summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        //   summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        // }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);

  // $scope.id stores the trip mongoose _.id
  $scope.id = $stateParams.id;
  
  ActivitiesData.getTripActivities($scope.id, function (tripObj) {
    $scope.dataLoaded = true;
    $scope.activities = tripObj.data.list;
    $scope.name = tripObj.data.name;
    $scope.destination = tripObj.data.destination;

    // renderMap();
  });

  $scope.$watchCollection('activities', function(newOrder, oldOrder) {
    renderMap();
  })

})