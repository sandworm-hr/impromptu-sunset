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

  it('should emit a user update properly', function() {
    createController();
    spyOn($scope.socket, 'emit');
    $scope.socket.emit();
    expect($scope.socket.emit).toHaveBeenCalled();
  });

  it('should create a default username and colorIndex', function() {
    createController();
    var user = $scope.getMyUserAndColor();
    var expectedUser = {username: 'you', colorIndex: 10};

    expect(user).toEqual(expectedUser);
  });

  it('should update myUser and color when the session data changes', function() {
    createController();
    var newUserData = {username: 'spiderdog', colorIndex: 8};
    $scope.myUser = {username: 'flipper', colorIndex: 4};
    spyOn($scope, 'getMyUserAndColor').and.returnValue(newUserData);
    $scope.updateMyUserAndColor();
    expect($scope.myUser).toEqual(newUserData);
  });
});