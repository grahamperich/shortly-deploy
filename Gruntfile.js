module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/clientConcat.js': ['public/dist/clientConcat.js'],
          'public/dist/libConcat.js': ['public/dist/libConcat.js']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': ['public/style.css']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    gitpush: {
      target: {
        options: {
          verbose: true,
          remote: 'live',
          branch: 'master'
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      client: {
        src: ['./public/client/*.js'],
        dest: './public/dist/clientConcat.js'
      },
      lib: {
        src: ['./public/lib/jquery.js', './public/lib/underscore.js', './public/lib/backbone.js', './public/lib/handlebars.js'],
        dest: './public/dist/libConcat.js'
      }
    },

    clean: ['./public/dist/*'],

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('build', []);

  grunt.registerTask('min', ['uglify', 'cssmin']);

  grunt.registerTask('push', ['gitpush']);

  grunt.registerTask('cat', ['clean', 'concat']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
