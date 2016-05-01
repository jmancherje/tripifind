angular.module('app.navbar', ['app.services'])

.controller('NavbarController', function ($scope, $state, LoginModal, auth, store) {
  var profile = store.get("profile");
  $scope.user;

  $scope.$watch(function() {
    return store.get("profile");
  }, function() {
    var profile = store.get("profile");
    if (!auth.profile) {
      $scope.user = undefined;
    } else {
      $scope.user = auth.profile.nickname;
    }
    $scope.isLoggedIn = !!profile;
  })

  $scope.isLoggedIn = !!profile;
  
  $scope.login = function() {
    LoginModal();
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $scope.isLoggedIn = false;
  }
});