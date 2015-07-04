app.controller('ProfileController', ['$scope', 'Session', 'Sessions', '$stateParams', function ($scope, Session, Sessions, $stateParams) {


  // Calls the Session factory to get the sessions of that user.
  $scope.getSessions = function (callback) {
    if ($stateParams.username) {
      Sessions.getSessions(function(data){
        $scope.sessions = $scope.filterSessions(data);
        callback(data);
      }, $stateParams.username);
    } else {
      Sessions.getSessions(function(data){
        $scope.sessions = $scope.filterSessions(data);
        callback(data);
      });
    }
  };

  $scope.filterSessions = function(sessionData) {
    return _.filter(sessionData, function(currentSession) {
      var d = new Date(currentSession.createdAt);
      currentSession.localTimeString = d.toLocaleTimeString();
      return $scope.isCurrentUser() || currentSession.visibility === 'public';
    });
  };

  $scope.getUser = function() {
    //check whether requested profile belongs to session user or non-session (friend) user
    var sessionUsername = Session.getUser().username;
    //if $stateParams.username does not exist, session user is requesting own profile
    if(!$stateParams.username){
      $scope.username = sessionUsername;
    } else {
      $scope.username = $stateParams.username;
    }
  };

  $scope.isCurrentUser = function() {
   return Session.getUser().username === $stateParams.username;
  };

  // parse data before plotting it on d3
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

  // Word count chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.wordcount = { loaded : function(){
    if($scope.sessions){
      var word_count = _.pluck($scope.sessions, "word_count");
      $scope.plot('wordcount',word_count, "Word Count Per Session");
    }
    else{
      $scope.getSessions(function(data){
        $scope.wordcount.loaded();
      }); 
    }
  }};

  // Character count chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.charcount = { loaded : function(){
    if($scope.sessions){
      var char_count = _.pluck($scope.sessions, "char_count");
      $scope.plot('charcount', char_count, "Char Count Per Session");  
    }
    else{
      $scope.getSessions(function(data){
        $scope.charcount.loaded();
      }); 
    }
  }};

  // Consistency chart.
  // When the d3 directive for that chart loads, the loaded method will be called
  // if the sessions are not yet populated, we will get them, otherwise plot.
  $scope.consistency = { loaded : function(){
    if($scope.sessions){
      var potential = (1) * 10000 * 60; //potential score per minute
      var consistency = _.pluck($scope.sessions, "scores");
      consistency = _.filter(consistency, function(item){
        return item !== null && item.length > 0;
      })
      consistency = _.map(consistency, function(scores){
        var total_percent = _.reduce(scores, function(memo, element, index){
          return memo + (element/potential * 100);
        },0);
        var sum = Math.round(total_percent / scores.length);
        return sum;
      });
      $scope.plot('consistency', consistency, "Avg consistency per session");  
    }
    else{
      $scope.getSessions(function(data){
        $scope.consistency.loaded();
      }); 
    }
  }};
    

  // parses data then plots the graph by calling the d3 createGraph method for that chart.
  // control is what connects us to the directive. we pass in in the view. so each chart has its
  // own control object. This enables us to call a method in the directive.
  $scope.plot = function(control, data, type){
    data = parseData(data);
    $scope[control].createGraph(data, type);
  };

  $scope.getSessions(console.log);
  $scope.getUser();

}]);
