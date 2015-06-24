
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




    var createGraph = function(dataArray) {

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
          .x(function(d) { return x(d.increment); })
          .y(function(d) { return y(d.point); });

        var data = parseData(dataArray);

        x.domain(d3.extent(data, function(d) { return d.increment; }));
        y.domain(d3.extent(data, function(d) { return d.point; }));

        $timeout(function() {
            console.log('appending svg');
            var svg = d3.select("#graph").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Consistency Score");

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        }, 1);
    }

    $scope.graphScores = function() {
      createGraph($scope.scores);
    };


    $scope.graphConsistency = function() {
      var potential, data = [];
      _.reduce(Results.getScores(), function (memo, score, index) {
        memo += score;
        potential = (index + 1) * 10000;
        data.push((memo/potential) * 100);
        return memo;
      }, 0);
      console.log(data);

    };

  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
