'use strict';

describe('CreateTripController', function () {
  var $scope, $rootScope, $location, createController, $httpBackend, ActivitiesData;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    ActivitiesData = $injector.get('ActivitiesData');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('CreateTripController', {
        $scope: $scope,
        ActivitiesData: ActivitiesData,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a startItinerary method  on the $scope', function () {
    expect($scope.startItinerary).to.be.an('function');
  });

  it('should have a addToTrip method  on the $scope', function () {
    expect($scope.addToTrip).to.be.an('function');
  });

  it('should have a removeFromTrip method  on the $scope', function () {
    expect($scope.removeFromTrip).to.be.an('function');
  });

  it('should have a saveItinerary method  on the $scope', function () {
    expect($scope.saveItinerary).to.be.an('function');
  });

});