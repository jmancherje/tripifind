angular.module('app.navbar', ['app.services'])

.controller('NavbarController', function ($scope, $state, auth, store) {
  var profile = store.get("profile");

  console.log('auth in navbar controller: ', auth)

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
    console.log('scope.user', $scope.user)
  })

  $scope.isLoggedIn = !!profile;
  
  $scope.login = function() {
    auth.signin();
  }

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $scope.isLoggedIn = false;
  }
});