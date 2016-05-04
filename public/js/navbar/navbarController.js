angular.module('app.navbar', ['app.services'])

.controller('NavbarController', function ($scope, $state, auth, store) {
  var profile = store.get("profile");
  $scope.auth = auth;

  $scope.isLoggedIn = !!profile;
  
  $scope.login = function() {
    auth.signin();
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $scope.isLoggedIn = false;
    $state.go('landing');
  }
});