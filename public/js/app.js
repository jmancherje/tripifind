// app is called app
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
  'app.trip',
  'app.landing',
  'app.create',
  'app.navbar',
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


  authProvider.on('loginSuccess', function($location, profilePromise, idToken, store, $rootScope) {
    profilePromise.then(function(profile) {
      $rootScope.user = profile;
      store.set('profile', profile);
      store.set('token', idToken);
    });
  });

  authProvider.on('loginFailure', function() {
     // Error Callback
     alert("Login Failed. Please Try Again. :)")
  });
  
  $urlRouterProvider.otherwise('/')

  $stateProvider
    
    .state('landing', {
      url: '/',
      templateUrl: './js/templates/landing.html',
      controller: 'LandingController',
      data: {
        requireLogin: false
      }
    })

    .state('createTrip', {
      url: '/create',
      templateUrl: './js/templates/createTrip.html',
      controller: 'CreateTripController',
      data: {
        requireLogin: true
      }
    })

    .state('myTrips', {
      url: '/mytrips',
      templateUrl: './js/templates/mytrips.html',
      controller: 'MyTripsController',
      data: {
        requireLogin: true
      }
    })

    .state('trip', {
      url: '/trip/:id',
      templateUrl: './js/templates/tripView.html',
      controller: 'TripController',
      data: {
        requireLogin: false
      }
    })

})


.run(function($rootScope, auth, store, jwtHelper, $location, $state) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
  
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var token = store.get('token');
    var user = store.get('profile');

    if (requireLogin && (!user || jwtHelper.isTokenExpired(token))) {
      event.preventDefault();

      auth.signin({}, function(profile, idToken, accessToken, state, refreshToken) {
        $state.go(toState.name, toParams);
      }, function(err) {
        $state.go('landing');
      })
    }
  });

})

.controller('LoginCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});