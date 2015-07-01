module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env : {
        options : {
        //Shared Options Hash
        },
        test : {
          NODE_ENV : 'test',
        },
    },

    jasmine_nodejs: {
      your_target: {
        // spec files
        specs: [
            "spec/server/**",
        ]
      }
    },
    // grunt nodemon to run local server
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    // docco for documenting our code from our comments.
    docco: {
      server: {
        src: ['server/**/*.js'],
        options: {
          output: 'docs/server',
        }
      },
      client: {
        src: ['client/index.html', 'client/app/**/*.html', 'client/app/**/*.js'],
        options: {
          output: 'docs/client',
        }
      }
    },

    shell: {
      // push code to heroku
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      // run migrations on heroku
      "heroku-migrate": {
        command: 'heroku run sequelize db:migrate --env production -m --app impromptu-sunset',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      // run local migrations
      "local-migrate": {
        command: ['cd server','sequelize db:migrate --config config/personal_config.json --env development'].join('&&'),
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      "test-migrate": {
        command: ['cd server','sequelize db:migrate --config config/personal_config.json --env test'].join('&&'),
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      },
      "db-create":{
        command: ['psql postgres -c "CREATE DATABASE dev"','psql postgres -c "CREATE DATABASE test"'].join('&&'),
        options: {
          stdout: true,
          stderr: true,
          failOnError: false
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    
    "file-creator": {
      "env": {
        "./.env": function(fs, fd, done) {
          var user = grunt.option('user');
          fs.writeSync(fd, 'DATABASE_URL=postgres://'+user+'@localhost:5432/dev\n');
          fs.writeSync(fd, 'TEST_DATABASE_URL=postgres://'+user+'@localhost:5432/test\n');
          done();
        }
      },
      "personal_config": {
        "server/config/personal_config.json": function(fs, fd, done) {
          var user = grunt.option('user');
          var json = {
            "development": {
              "username": user,
              "password": null,
              "database": "dev",
              "host": "127.0.0.1",
              "dialect": "postgres"
            },
            "test": {
              "username": user,
              "password": null,
              "database": "test",
              "host": "127.0.0.1",
              "dialect": "postgres"
            }
          };
          fs.writeSync(fd, JSON.stringify(json, null, 2));
          done();
        }
      }
    }

  });

  

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-file-creator');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // test task runs server side and client side tests
  grunt.registerTask('test', ['env:test','jasmine_nodejs', 'karma']);
  // upload task. --prod to deploy to heroku 
  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  // run grunt migrate to run local migrations
  // run grunt migrate --prod to run heroku migrations
  grunt.registerTask('migrate', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'shell:heroku-migrate' ]);
    } else {
      grunt.task.run([ 'shell:local-migrate' ]);
    }
  });

  // grunt deploy --prod to push to heroku
  grunt.registerTask('deploy', [
    'upload'
  ]);

  // run for initial setup
  // grunt --user bahiaelsharkawy (your username on mac/linux)
  grunt.registerTask('setup', [
    'shell:db-create',
    'file-creator',
    'shell:local-migrate',
    'shell:test-migrate'
  ]);

  // run to setup heroku by running migrations
  grunt.registerTask('heroku-setup', [
    'shell:heroku-migrate'
  ]);


};
