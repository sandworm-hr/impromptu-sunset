
app.controller('ResultsController', ['$scope', '$timeout', 'Results', function($scope, $timeout, Results) {

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("class", "graph")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");    

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

    var removeGraph = function() {

      $timeout(function() {
        console.log('removing graph');

        var graph = d3.select("svg").select(".graph");

        console.log(graph);

        graph.select('g.horizontal')
          .transition()
            .duration(1500)
            .attr("transform", "translate(" + width + "," + height + ")")
            .style("fill-opacity", 1e-6)
            .style("stroke-opacity", 1e-6)
            .remove();
        
        graph.select('g.vertical')
          .transition()
            .duration(1500)
            .attr("transform", "translate(0," + height + ")")
            .style("fill-opacity", 1e-6)
            .style("stroke-opacity", 1e-6)
            .remove();

        graph.select('path.line')
          .transition()
            .duration(1500)
            .attr("transform", "translate(" + width + ", 0)")
            .style("stroke-opacity", 1e-6)
            .remove();
      }, 1);

    }


    var createGraph = function(dataArray, yLabel) {

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
          
            svg.append("g")
                .attr("class", "x axis horizontal")
                .transition()
                  .duration(1500)
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

            svg.append("g")
                .transition()
                  .duration(1500)
                  .attr("class", "y axis vertical")
                  .call(yAxis);

            svg.select(".vertical").append("text")
                .transition()
                  .duration(1500)
                  .attr("class", "y label")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text(yLabel);

            svg.append("path")
              .datum(data)
              .attr("class", "line")
              .transition()
                .duration(1500)
                // .style("stroke-opacity", 1e-6)
                .style("stroke-opacity", 1)
                .attr("d", line);

        }, 1);
    };

    createGraph($scope.scores, "Score");

    $scope.graphScores = function() {
      removeGraph();
      $timeout(function(){
        createGraph($scope.scores, "Score");
      }, 2000);
    };


    $scope.graphConsistency = function() {
      var potential, data = [];
      _.reduce(Results.getScores(), function (memo, score, index) {
        memo += score;
        potential = (index + 1) * 10000;
        data.push((memo/potential) * 100);
        return memo;
      }, 0);
    
      removeGraph();
      $timeout(function(){
        createGraph(data, "Consistency");
      }, 2000);
    };

  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
