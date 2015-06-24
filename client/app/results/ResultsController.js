
app.controller('ResultsController', ['$scope', 'Results', function($scope, Results) {


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
  
    $scope.sendResultsToServer = function() {
      var resultsObj = {};

      resultsObj.session_time = $scope.duration;
      resultsObj.char_count = $scope.charCount;
      resultsObj.text = $scope.rawText;
      resultsObj.scores = $scope.minuteScores;
      resultsObj.word_count = $scope.wordCount;

      Results.postResults(resultsObj);
    };


  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
