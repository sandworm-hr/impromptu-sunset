
app.controller('ResultsController', ['$scope', 'Results', function($scope, Results) {

  console.log(Results);

  $scope.setValues = function() {
    console.log("inside ",Results);
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
  };

}]);
