angular.module('app.login', [])

.controller('LoginModalCtrl', function ($scope) {

  $scope.login = true;
  $scope.switchLogin = function() {
    $scope.login = !$scope.login;
  }

  this.cancel = $scope.$dismiss;

  this.login = function (email, password) {
    console.log('login with ', email, password)
    // UsersApi.login(email, password).then(function (user) {
    $scope.$close();
    // });
  };

  this.signup = function(email, password, confirmPassword) {
    console.log('sign up...', email, password, confirmPassword)
    $scope.close();
  }

});