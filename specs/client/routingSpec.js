'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('app'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    expect($route.routes['/']).to.be.defined;
    expect($route.routes['/'].controller).to.equal('LandingController');
    expect($route.routes['/'].templateUrl).to.equal('./js/templates/landing.html');
  });

  it('Should have /signup route, template, and controller', function () {
    expect($route.routes['/signup']).to.be.defined;
    expect($route.routes['/signup'].controller).to.equal('AuthController');
    expect($route.routes['/signup'].templateUrl).to.equal('./js/templates/signup.html');
  });

  it('Should have /login route, template, and controller', function () {
    expect($route.routes['/login']).to.be.defined;
    expect($route.routes['/login'].controller).to.equal('AuthController');
    expect($route.routes['/login'].templateUrl).to.equal('./js/templates/login.html');
  });

  it('Should have /create route, template, and controller', function () {
    expect($route.routes['/create']).to.be.defined;
    expect($route.routes['/create'].controller).to.equal('CreateTripController');
    expect($route.routes['/create'].templateUrl).to.equal('./js/templates/createTrip.html');
  });

  it('Should have /myTrips route, template, and controller', function () {
    expect($route.routes['/myTrips']).to.be.defined;
    expect($route.routes['/myTrips'].controller).to.equal('MyTripsController');
    expect($route.routes['/myTrips'].templateUrl).to.equal('./js/templates/mytrips.html');
  });

});
