'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
          serve: true,
          watch: true,
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
    }
  });

  grunt.registerTask('default', ['jekyll:server']);
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
};
