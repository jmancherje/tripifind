// app is called app
// app.auth loads authentication controller
// app.trip loads the tripViewController
// app.landing loads the landing controller
// app.create loads the createTrip controller
// app.services loads all factory/service functionality
// app.mytrips loads myTrips controller
// ngRoute is for angular routing
// var tripApp = angular.module('tripApp', ['ui.sortable', 'ui.router'])
var app = angular.module('app', ['app.auth', 'app.trip', 'app.landing', 'app.create', 'app.navbar', 'app.login', 'app.services', 'app.mytrips', 'ui.sortable', 'uiGmapgoogle-maps', 'ui.router', 'ngTouch', 'ui.bootstrap'])

app.config(function ($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/')

  $stateProvider
    
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