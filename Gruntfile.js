'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      lint: ['app.js', 'Gruntfile.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('heroku', ['jshint']);
};