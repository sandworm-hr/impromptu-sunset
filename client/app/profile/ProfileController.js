app.controller('ProfileController', ['$scope', 'Sessions', function ($scope, Sessions) {

  $scope.sessions;

  $scope.margin = {top: 0, right: 50, bottom: 0, left: 50},
  $scope.width = 960 - $scope.margin.left - $scope.margin.right,
  $scope.height = 500 - $scope.margin.top - $scope.margin.bottom;


  $scope.getSessions = function (callback) {
    Sessions.getSessions(function(data){
      $scope.sessions = data;
      callback(data)
    });
  };


  var parseData = function(array) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        var d = {};
        d.increment = i;
        d.point = array[i];
        result.push(d);
      }
      return result;
  };

  $scope.wordcount = { loaded : function(){
    if($scope.sessions){
      var word_count = _.pluck($scope.sessions, "word_count");
      $scope.plot('wordcount',word_count, "Word Count Per Session");
    }
    else{
      $scope.getSessions(function(data){
        var word_count = _.pluck(data, "word_count");
        $scope.plot('wordcount',word_count, "Word Count Per Session");
      }); 
    }
  }};

  $scope.charcount = { loaded : function(){
    if($scope.sessions){
      var char_count = _.pluck($scope.sessions, "char_count");
      $scope.plot('charcount', char_count, "Char Count Per Session");  
    }
    else{
      $scope.getSessions(function(data){
        var char_count = _.pluck(data, "char_count");
        $scope.plot('charcount', char_count, "Char Count Per Session");  
      }); 
    }
  }};

    


  $scope.plot = function(control, data, type){
    data = parseData(data);
    $scope[control].createGraph(data, type);
  }

  
  // $scope.graphScores = function() {
  //   $scope.control.removeGraph();
  //   $timeout(function(){
  //     $scope.plot($scope.scores, "Score");
  //   }, 2000);
  // };


}]);
