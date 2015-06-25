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

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

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
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docco');

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

  grunt.registerTask('test', ['env:test','jasmine_nodejs', 'karma']);
  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'upload'
  ]);


};
