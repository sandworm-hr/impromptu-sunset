
app.controller('ResultsController', ['$scope', '$timeout', 'Results','$state','Session', function($scope, $timeout, Results, $state, Session) {

    $scope.margin = {top: 10, right: 20, bottom: 30, left: 70},
    $scope.width = 960 - $scope.margin.left - $scope.margin.right,
    $scope.height = 400 - $scope.margin.top - $scope.margin.bottom;

    $scope.duration = Results.getDuration();
    $scope.rawText = Results.getText();
    $scope.minuteScores = Results.getScoresPerMinute();
    $scope.wordCount = Results.getWordCount();
    $scope.charCount = Results.getCharacterCount();
    $scope.wpm = Math.floor(($scope.wordCount / $scope.duration) * 1000) / 1000;
    $scope.cpm = $scope.charCount / $scope.duration;
    $scope.total = Results.getTotalScore();
    $scope.possible = $scope.duration * 60 * 10000;
    $scope.consistency = Math.floor(($scope.total / $scope.possible) * 1000) / 10;

    $scope.spinnerToggle = false;
    $scope.isSaved = false;
    $scope.saveRequested = false;

    $scope.control = { loaded : function(){
      $scope.scores = Results.getScores();
      $scope.onScores = true;
      // redirect to index page if no scores!
      if(!$scope.scores)
        $state.go('index');
      else{
        $scope.plot($scope.scores, "Score");
      }
    }};

    $scope.initializeSave = function() {
      $scope.saveRequested = true;
    };

    // Retrieves session information from the Results service and sends it to the server
    // to be stored in the database.
    $scope.sendResultsToServer = function() {
      if(Session.isAuthenticated()){
        $scope.startSpinner();
        var resultsObj = {};
        resultsObj.session_time = Results.getDuration();
        resultsObj.char_count = Results.getCharacterCount();
        resultsObj.text = Results.getText();
        resultsObj.scores = Results.getScoresPerMinute();
        resultsObj.word_count = Results.getWordCount();
        resultsObj.title = $scope.sessionTitle;

        Results.postResults(resultsObj)
          .success(function(data, status) {
            // $scope.status = 'Saved Session Data';
            $scope.stopSpinner();
            $scope.saveRequested = false;
            $scope.isSaved = true;
          })
          .catch(function(data) {
            // FOR TESTING:
            // in testing there is no data object
            // if there is a data object, we are not running a test
            // therefore we need to set the scope message
            if (data.data) {
              $scope.message = data.data.message;
            }
            $scope.saveRequested = false;
            // $scope.status = 'Save Failed';
            $scope.stopSpinner();
         });
      } else {
        $state.go('login');
      }
    };

    $scope.startSpinner = function() {
      $scope.spinnerToggle = true;
    };

    $scope.stopSpinner = function() {
      $scope.spinnerToggle = false;
    };

    // if authenticated save to db right away.
    // if(Session.isAuthenticated()){
    //   $scope.sendResultsToServer();
    // }
    
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

    $scope.plot = function(data, type){
      data = parseData(data);
      $scope.control.createGraph(data, type);
    }

    $scope.graphScores = function() {
      $scope.onScores = true;
      $scope.control.removeGraph();
      $timeout(function(){
        $scope.plot(Results.getScores(), "Score");
      }, 1020);
    };


    $scope.graphConsistency = function() {
      $scope.onScores = false;
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
      }, 1020);
    };

  // $scope.debugSendValues = function(valuesObj) {
  //   console.log('inside the debug send values controller');
  //   console.log(valuesObj);
    
  // };

}]);
