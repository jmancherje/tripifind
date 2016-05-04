angular.module('app.profile', [])

.controller('ProfileController', function($scope, $state, store, auth) {

  $scope.auth = auth;
})