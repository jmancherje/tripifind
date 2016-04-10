// app is called app
// app.auth loads authentication controller
// app.trip loads the tripViewController
// app.landing loads the landing controller
// app.create loads the createTrip controller
// app.services loads all factory/service functionality
// app.mytrips loads myTrips controller
// ngRoute is for angular routing
angular.module('app', ['app.auth', 'app.trip', 'app.landing', 'app.create', 'app.services', 'app.mytrips', 'ngRoute'])


.config(function ($routeProvider) {
  $routeProvider
    // landing page
    .when('/', {
      templateUrl: './js/templates/landing.html',
      controller: 'LandingController'
    })
    // login page
    .when('/login', {
      templateUrl: './js/templates/login.html',
      controller: 'AuthController'
    })
    // signup page
    .when('/signup', {
      templateUrl: './js/templates/signup.html',
      controller: 'AuthController'
    })
    // trip creation page
    .when('/create', {
      templateUrl: './js/templates/createTrip.html',
      controller: 'CreateTripController'
    })
    // myTrips page
    .when('/myTrips', {
      templateUrl: './js/templates/mytrips.html',
      controller: 'MyTripsController'
    })
    // splash page
    .when('/splash', {
      templateUrl: './js/templates/splash.html',
    })
    // single trip page
    .when('/trip/:id', {
      templateUrl: './js/templates/tripView.html',
      controller: 'TripController'
    })
    .otherwise('/');
});