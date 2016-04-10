'use strict';

describe('Services', function () {
  beforeEach(module('app.services'));

  afterEach(inject(function ($httpBackend) {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  }));


  describe('Activity Factory', function () {
    var $httpBackend, ActivitiesData;

    beforeEach(inject(function (_$httpBackend_, _ActivitiesData_) {
      $httpBackend = _$httpBackend_;
      ActivitiesData = _ActivitiesData_;
    }));

    it('should exist', function () {
      expect(ActivitiesData).to.exist;
    });

    it('should have a method `getTrips`', function () {
      expect(ActivitiesData.getTrips).to.be.a('function');
    });

    it('should have a method `getActivities`', function () {
      expect(ActivitiesData.getActivities).to.be.a('function');
    });

    it('should have a method `getUsersTrips`', function () {
      expect(ActivitiesData.getUsersTrips).to.be.a('function');
    });

    it('should have a method `getIndividualTrip`', function () {
      expect(ActivitiesData.getIndividualTrip).to.be.a('function');
    });

    it('should have a method `createTrip`', function () {
      expect(ActivitiesData.createTrip).to.be.a('function');
    });

    it('should have a method `getTripActivities`', function () {
      expect(ActivitiesData.getTripActivities).to.be.a('function');
    });

  });

});