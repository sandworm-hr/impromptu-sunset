
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
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/partial-login.html'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/partials/partial-profile.html'
    })
});