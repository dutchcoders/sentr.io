'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      jekyll: {
        files: ['site/**/*.{html,md,rb,svg,xml,yml,scss}'],
        tasks: ['jekyll:server']
      }
    },
    jekyll: {
      options: {
        src: 'site'
      },
      dist: {
        options: {
          dest: 'dist',
        }
      },
      server: {
        options: {
          config: 'site/_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:dutchcoders/sentr.io.git',
          branch: 'gh-pages'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src : [
            '.jekyll/**/*.html',
            '.jekyll/css/**/*.css',
            '.jekyll/js/**/*.js',
            '.jekyll/img/**/*.{gif,jpg,jpeg,png,svg}'
          ]
        },
        options: {
          server: {
            baseDir: ".jekyll"
          },
          watchTask: true
        }
      }
    }
  });

  grunt.registerTask('default', ['browserSync','watch']);

  grunt.registerTask('build', [
    'jekyll:dist'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol'
  ]);

  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-browser-sync');
};
