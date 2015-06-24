
app.controller('ResultsController', ['$scope', '$timeout', 'Results', function($scope, $timeout, Results) {


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

    $scope.createGraph = function() {

        var margin = {top: 20, right: 20, bottom: 30, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scale.linear()
          .range([0, width]);

        var y = d3.scale.linear()
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left");

        var line = d3.svg.line()
          .x(function(d) { return x(d.close); })
          .y(function(d) { return y(d.close); });

        $timeout(function() {
            console.log('appending svg');
            var svg = d3.select("#graph").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
        }, 1);

    }


  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
