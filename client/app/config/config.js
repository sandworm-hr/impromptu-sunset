
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/index');

  $stateProvider

    .state('index', {
      url: '/index',
      templateUrl: '/app/home/home.html'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'app/profile/profile.html'
    })
});