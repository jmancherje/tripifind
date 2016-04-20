angular.module('app.login', [])

.controller('LoginModalCtrl', function ($scope) {

  this.cancel = $scope.$dismiss;

  this.submit = function (email, password) {
    console.log('sign in with ', email, password)
    // UsersApi.login(email, password).then(function (user) {
    $scope.$close(user);
    // });
  };

});