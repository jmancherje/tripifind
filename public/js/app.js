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
  'app.profile',
  'ui.sortable',
  'uiGmapgoogle-maps',
  'ui.router',
  'ngTouch',
  'ui.bootstrap',
  'google.places'
])

app.config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
  
  $urlRouterProvider.otherwise('/')

  $stateProvider
    
    .state('landing', {
      url: '/',
      templateUrl: './js/landing/landing.html',
      controller: 'LandingController',
      data: {
        requireLogin: false
      }
    })

    .state('createTrip', {
      url: '/create',
      templateUrl: './js/createTrip/createTrip.html',
      controller: 'CreateTripController',
      data: {
        requireLogin: true
      }
    })

    .state('myTrips', {
      url: '/mytrips',
      templateUrl: './js/myTrips/mytrips.html',
      controller: 'MyTripsController',
      data: {
        requireLogin: true
      }
    })

    .state('trip', {
      url: '/trip/:id',
      templateUrl: './js/tripView/tripView.html',
      controller: 'TripController',
      data: {
        requireLogin: false
      }
    })

    .state('profile', {
      url: '/profile',
      templateUrl: './js/profile/profile.html',
      controller: 'ProfileController',
      data: {
        requireLogin: true
      }
    })

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

  jwtInterceptorProvider.tokenGetter = function(auth) {
    return auth.idToken;
    // or
    // return store.get('token');
  }

  $httpProvider.interceptors.push('jwtInterceptor');

})


.run(function($rootScope, auth, store, jwtHelper, $location, $state) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();

  // $rootScope.$on('$stateChangeStart', function() {
  //   // Get the JWT that is saved in local storage
  //   // and if it is there, check whether it is expired.
  //   // If it isn't, set the user's auth state
  //   var token = store.get('token');
  // });
  
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;
    var token = store.get('token');
    var user = store.get('profile');

    // protecting authenticated routes
    if (requireLogin) {
      event.preventDefault();

      auth.signin({}, function(profile, idToken, accessToken, state, refreshToken) {
        $state.go(toState.name, toParams);
      }, function(err) {
        $state.go('landing');
      })
    }

    // for refreshing
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      }
    }
    else {
      // Otherwise, redirect to the home route
      $state.go('landing');
    }
  });

})

.controller('LoginCtrl', function ( $scope, auth) {

  $scope.auth = auth;

});