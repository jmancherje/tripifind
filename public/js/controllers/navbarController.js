angular.module('app.navbar', ['app.services'])

.controller('NavbarController', function ($scope, LoginModal) {
  
  $scope.isLoggedIn = false;
  $scope.logout = function() {
    console.log('logout')
    LoginModal()
      .then(function () {
        return $state.go(toState.name, toParams);
      })
      .catch(function () {
        return $state.go('welcome');
      });
    $scope.isLoggedIn = !$scope.isLoggedIn
  }

});