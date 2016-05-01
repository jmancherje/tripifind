angular.module('app.login', [])

.controller('LoginModalCtrl', function ($scope, auth) {

  $scope.auth = auth;

  this.cancel = $scope.$dismiss;

});