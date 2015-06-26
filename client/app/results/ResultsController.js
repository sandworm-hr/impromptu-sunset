
app.controller('ResultsController', ['$scope', '$timeout', 'Results', function($scope, $timeout, Results) {

    $scope.margin = {top: 0, right: 20, bottom: 30, left: 50},
    $scope.width = 960 - $scope.margin.left - $scope.margin.right,
    $scope.height = 500 - $scope.margin.top - $scope.margin.bottom;

    $scope.duration = Results.getDuration();
    $scope.scores = Results.getScores();
    $scope.rawText = Results.getText();
    $scope.minuteScores = Results.getScoresPerMinute();
    $scope.wordCount = Results.getWordCount();
    $scope.charCount = Results.getCharacterCount();
    $scope.wpm = $scope.wordCount / $scope.duration;
    $scope.cpm = $scope.charCount / $scope.duration;
    $scope.total = Results.getTotalScore();
    $scope.possible = $scope.duration * 60 * 10000;
    $scope.consistency = $scope.total / $scope.possible;


    // Retrieves session information from the Results service and sends it to the server
    // to be stored in the database.
    $scope.sendResultsToServer = function() {
      var resultsObj = {};
      resultsObj.session_time = Results.getDuration();
      resultsObj.char_count = Results.getCharacterCount();
      resultsObj.text = Results.getText();
      resultsObj.scores = Results.getScoresPerMinute();
      resultsObj.word_count = Results.getWordCount();

      Results.postResults(resultsObj)
        .success(function(data, status) {
           $scope.status = 'Saved Session Data';
        })
        .catch(function(data) {
        // FOR TESTING:
        // in testing there is no data object
        // if there is a data object, we are not running a test
        // therefore we need to set the scope message
        if (data.data) {
          $scope.message = data.data.message;
        }
        $scope.status = 'Save Failed';
       });
    };
    
    // Creates an array of tuple objects, where the x axis is the index and the y axis is the value of the input array at i.
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

    $scope.control = { loaded : function(){
      $scope.plot($scope.scores, "Score");
    }};

    $scope.plot = function(data, type){
      data = parseData(data);
      $scope.control.createGraph(data, type);
    }

    $scope.graphScores = function() {
      $scope.control.removeGraph();
      $timeout(function(){
        $scope.plot(Results.getScores(), "Score");
      }, 1600);
    };


    $scope.graphConsistency = function() {
      var potential, data = [];
      _.reduce(Results.getScores(), function (memo, score, index) {
        memo += score;
        potential = (index + 1) * 10000;
        data.push((memo/potential) * 100);
        return memo;
      }, 0);
    
      $scope.control.removeGraph();
      $timeout(function(){
        $scope.plot(data, "Consistency");
      }, 1600);
    };

  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
