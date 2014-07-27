/*
 * grunt-enyo-builder
 * https://github.com/derek/grunt-enyo-builder
 *
 * Copyright (c) 2014 Derek M. Anderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Configuration to be run (and then tested).
		enyo_clone : {
			default_options : {

			},
		},
		enyo_builder : {
			default_options : {

			},
		},
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-symlink');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', [ 'clean', 'enyo-builder', 'nodeunit' ]);

	// By default, lint and run all tests.
	grunt.registerTask('build', [ 'jshint', 'test' ]);

	grunt.registerTask('default', [ 'enyo-clone' ]);

};