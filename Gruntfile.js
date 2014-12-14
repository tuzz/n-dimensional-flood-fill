/* jshint camelcase: false */
"use strict";

module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jasmine-node");

  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "lib/**/*.js",
        "spec/**/*.js"
      ],
      options: {
        jshintrc: true
      }
    },
    jasmine_node: {
      all: ["spec"],
      options: {
        useHelpers: true
      }
    }
  });

  grunt.registerTask("default", ["jasmine_node", "jshint"]);
};

