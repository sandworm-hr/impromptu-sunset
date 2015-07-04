angular.module('app.services')
  .factory('RandomPrompt', function ($http) {
    var services = {};

    services.getPrompt = function(callback) {
      $http({
        method: 'GET',
        url: 'https://www.reddit.com/r/writingprompts/.json'
      })
      .success(function(response) {
        var check = false;
        while(!check) {
          var prompts = response.data.children;
          var index = Math.floor(Math.random()*prompts.length);
          var title = prompts[index].data.title;
          if(title.slice(0,4) === '[WP]' || title.slice(0,4) === '[TT]' || title.slice(0,4) === '[EU]') {
            var randomPrompt = title.slice(4).trim();
            check = true;
          }  
        }
        callback(randomPrompt);
      })
      .error(function(error) {
        console.log(error);
      });
    };

    return services;
  });