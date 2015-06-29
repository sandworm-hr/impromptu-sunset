"use strict";

describe('Home Controller', function() {
  var $scope;
  var ctrl;
  var $controller;
  var createController;
  var $rootScope;
  var $httpBackend;
  var Results;
  var ColorIndexService;
  var Session;
  var Time;
  var Score;
  var $interval;
  var $timeout;
  var $interval;

  beforeEach(module('app'));


  beforeEach(inject(function($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $timeout = $injector.get('$timeout');
    $interval = $injector.get('$interval');

    Results = $injector.get('Results');
    Session = $injector.get('Session');
    ColorIndexService = $injector.get('ColorIndexService');
    Time = $injector.get('Time');
    Score = $injector.get('Score');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');


    createController = function() {
      return $controller('HomeController', {
        $scope: $scope,
        Results: Results,
        Session: Session,
        ColorIndexService: ColorIndexService,
        Time: Time,
        Score: Score,
        $timeout: $timeout,
        $interval: $interval,
        $httpBackend: $httpBackend
      });
    };
  }));

  it('should listen for keystrokes', function() {
    createController();
    expect(typeof $scope.setTime).toBe('function');
    var e = {};
    e.timeStamp = 24;
    $scope.setTime(e);
    expect(Time.getLastKeyPress()).toBe(24);
  });

  it('should have a startTimer function and a stopTimer function', function() {
    createController();
    expect(typeof $scope.startTimer).toBe('function');
    expect(typeof $scope.stopTimer).toBe('function');
  });

  describe('time input', function() {

    it('should get the length of the game in minutes', function() {
      createController();
      $scope.timerInput = 15;
      spyOn(Time, 'setMinuteCount');
      $scope.startTimer();
      expect(Time.setMinuteCount).toHaveBeenCalled();
    });

    it('should only accept numbers', function() {
      createController();
      $scope.timerInput = "cheddar";
      $scope.startTimer();
      expect($scope.timerInput).toBe('please enter a number of minutes');
    });
  });

  describe('score keeping', function() {

    xit('should only play one game at a time', function() {
      createController();
      spyOn(start);
      expect(start).toBe(undefined);
      $scope.startTimer();
      expect(start).toBeDefined();
      expect(angular.isDefined(start)).toBe(true);
    });


    it('should calculate scores with the Score service', function() {
      expect(Score.getScore(500, 0)).toBe(10000);
      expect(Score.getScore(1500, 0)).toBe(9000);
      expect(Score.getScore(1500, 0)).toBe(8000);
      expect(Score.getScore(500, 0)).toBe(9000);
    });

    it('should apply a minimum and maximum to the scores', function() {
      expect(Score.getScore(500, 0)).toBe(Score.getMaxScore());
      expect(Score.getScore(500, 0)).toBe(Score.getMaxScore());
      for (var i = 0; i < 11; i++) {
        Score.getScore(2000, 0);
      }
      expect(Score.getScore(1500, 0)).toBe(0);
    });

    it('should calculate color with the ColorIndex service', function() {
      var score, max;
      score = Score.getScore(500, 0), max = Score.getMaxScore();
      expect(ColorIndexService.getRoundedIndex(score, max)).toBe(10);
      score = Score.getScore(1500, 0), max = Score.getMaxScore();
      expect(ColorIndexService.getRoundedIndex(score, max)).toBe(9);
      score = Score.getScore(1500, 0), max = Score.getMaxScore();
      expect(ColorIndexService.getRoundedIndex(score, max)).toBe(8);
      score = Score.getScore(500, 0), max = Score.getMaxScore();
      expect(ColorIndexService.getRoundedIndex(score, max)).toBe(9);
    });

    it('should store data in the Results service', function() {
      createController();
      Results.setDuration(1);
      Results.setText("hello world");
      var scores = [1, 2, 3];
      Results.setScores(scores);
      expect(Results.getDuration()).toBe(1);
      expect(Results.getText()).toBe("hello world");
      expect(Results.getScores()).toBe(scores);
    });

  });

});
