
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/index');

  $stateProvider

    .state('index', {
      url: '/index',
      templateUrl: '/app/partials/partial-index.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'app/partials/partial-signup.html'
    });
});