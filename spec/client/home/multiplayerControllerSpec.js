"use strict";

describe('Multiplayer Controller', function() {
  var $scope;
  var ctrl;
  var $controller;
  var createController;
  var $rootScope;
  var $httpBackend;
  var ColorIndexService;
  var Session;
  var $interval;

  beforeEach(module('app'));


  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Session = $injector.get('Session');
    ColorIndexService = $injector.get('ColorIndexService');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');


    createController = function() {
      return $controller('MultiplayerController', {
        $scope: $scope,
        Session: Session,
        ColorIndexService: ColorIndexService,
      });
    };
  }));

  it('should return true every time', function() {
    expect(true).toBe(true);
  });

  it('should have a users collection', function() {
    createController();
    expect($scope.usersCollection).toBeDefined();
  }); 
});