'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: ['app.js', 'Gruntfile.js']
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('heroku', 'jshint');
};