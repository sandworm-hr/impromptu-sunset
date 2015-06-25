// Karma configuration
// Generated on Wed Jun 24 2015 16:54:20 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // ## bower dependencies
      'client/lib/d3/d3.min.js',
      'client/lib/angular/angular.min.js',
      'client/lib/angular-bootstrap/ui-bootstrap.min.js',
      'client/lib/angular-ui-router/release/angular-ui-router.min.js',
      'client/lib/angular-cookies/angular-cookies.min.js',
      'client/lib/underscore/underscore-min.js',
      'client/lib/angular-messages/angular-messages.min.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/lib/socket.io-client/socket.io.js',

      // ## app files
      // loads critical app files first
      'client/app/*.js',
      // loads all other app files
      'client/app/**/*.js', 

      // ## test files
      'spec/client/**/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
