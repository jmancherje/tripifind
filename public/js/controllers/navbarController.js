angular.module('app.navbar', ['app.services'])

.controller('NavbarController', function ($scope, $state, LoginModal) {
  
  $scope.isLoggedIn = false;
  $scope.logout = function() {
    console.log('logout')
    LoginModal()
      .then(function () {
        return $state.go(toState.name, toParams);
      })
      .catch(function () {
        return $state.go('landing');
      });
    $scope.isLoggedIn = !$scope.isLoggedIn
  }

});