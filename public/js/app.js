// app is called app
// app.auth loads authentication controller
// app.trip loads the tripViewController
// app.landing loads the landing controller
// app.create loads the createTrip controller
// app.services loads all factory/service functionality
// app.mytrips loads myTrips controller
// ngRoute is for angular routing
// var tripApp = angular.module('tripApp', ['ui.sortable', 'ui.router'])
var app = angular.module('app', [
  'auth0',
  'angular-storage',
  'angular-jwt',
  'app.auth',
  'app.trip',
  'app.landing',
  'app.create',
  'app.navbar',
  'app.login',
  'app.services',
  'app.mytrips',
  'ui.sortable',
  'uiGmapgoogle-maps',
  'ui.router',
  'ngTouch',
  'ui.bootstrap',
  'google.places'
])

app.config(function ($stateProvider, $urlRouterProvider, authProvider) {

  authProvider.init({
    domain: 'tripifind.auth0.com',
    clientID: 'INd2NB2FVHoVJJEQlPzH1oyrzwcbVqwJ'
  });

  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
    console.log("Login Success");
    profilePromise.then(function(profile) {
      store.set('profile', profile);
      store.set('token', idToken);
    });
    $location.path('/');
  });

  authProvider.on('loginFailure', function() {
     // Error Callback
  });
  
  $urlRouterProvider.otherwise('/')

  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: './js/templates/login2.html',
      controller: 'LoginCtrl'
    })
    
    .state('landing', {
      url: '/',
      templateUrl: './js/templates/landing.html',
      controller: 'LandingController'
    })

    .state('createTrip', {
      url: '/create',
      templateUrl: './js/templates/createTrip.html',
      controller: 'CreateTripController'
    })

    .state('myTrips', {
      url: '/mytrips',
      templateUrl: './js/templates/mytrips.html',
      controller: 'MyTripsController'
    })

    .state('trip', {
      url: '/trip/:id',
      templateUrl: './js/templates/tripView.html',
      controller: 'TripController'
    })

})


.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})

.controller('LoginCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});

// app.run(function ($rootScope, $state, LoginModal) {

//   $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//     var requireLogin = toState.data.requireLogin;

//     if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
//       event.preventDefault();

//       LoginModal()
//         .then(function () {
//           return $state.go(toState.name, toParams);
//         })
//         .catch(function () {
//           return $state.go('welcome');
//         });
//     }
//   });

// });