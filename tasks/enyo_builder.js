/*
 * grunt-enyo-builder
 * https://github.com/toxigenicpoem/grunt-enyo-builder
 *
 * Copyright (c) 2014 Derek M. Anderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var path = require('path');
	var fs = require('fs');
	var modulepath = path.resolve('node_modules/grunt-enyo-builder');
	var enyo = modulepath + '/enyo';
	var layout = modulepath + '/layout';
	var onyx = modulepath + '/onyx';

	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-symlink');

	grunt
			.registerMultiTask(
					'enyo-builder',
					'build an enyo component easily',
					function() {

						var options = this.options({
							tag : '2.4.0',
							lib : path.resolve('lib'),
						});

						console.log(options);
						var buildCmd = grunt.template
								.process(
										'nodejs <%= deploypath %> -T -e <%= enyo %> -s <%= dir %> -o <%= dir %>/dist -l <%= lib %>',
										{
											data : {
												deploypath : enyo
														+ '/tools/deploy.js',
												dir : process.cwd(),
												enyo : enyo,
												modulepath : modulepath,
												lib : options.lib
											}
										});

						grunt.config.set('exec.enyoDeploy', {
							cmd : buildCmd
						});

						grunt.config.set('clean.enyoBuild', [ 'build' ]);
						grunt.task.run('exec:enyoDeploy');
						grunt.task.run('clean:enyoBuild');
						grunt.verbose.ok();

					});

	grunt.registerTask('enyo-clone', 'clone enyo', function() {

		var options = this.options({
			tag : '2.4.0',
			lib : path.resolve('lib'),
		});

		console.log(options);

		grunt.config.set('gitclone.enyoClone', {
			options : {
				repository : 'https://github.com/enyojs/enyo.git',
				branch : options.tag,
				directory : enyo
			}
		});

		grunt.config.set('symlink.enyoLink', {
			// Enable overwrite to delete symlinks before recreating them
			options : {
				overwrite : false
			},
			files : {
				'enyo' : 'node_modules/grunt-enyo-builder/enyo',
			}
		});
		
		try {
			// Query the entry
			var files = fs.readdirSync(enyo);
		} catch (e) {
			grunt.task.run('gitclone:enyoClone');
			
		}
		grunt.task.run('symlink:enyoLink');
		
		grunt.verbose.ok();
	});
	
	grunt.registerTask('layout-clone', 'clone layout', function() {

		var options = this.options({
			tag : '2.4.0',
			lib : path.resolve('lib'),
		});

		console.log(options);

		grunt.config.set('gitclone.layoutClone', {
			options : {
				repository : 'https://github.com/enyojs/layout.git',
				branch : options.tag,
				directory : layout
			}
		});

		grunt.config.set('symlink.layoutLink', {
			// Enable overwrite to delete symlinks before recreating them
			options : {
				overwrite : false
			},
			files : {
				'lib/contrib/layout': layout
				
			}
		});
		
		try {
			// Query the entry
			var files = fs.readdirSync(layout);
		} catch (e) {
			grunt.task.run('gitclone:layoutClone');
			
		}
		console.log('gitclone.layoutClone');
		grunt.task.run('symlink:layoutLink');
		
		grunt.verbose.ok();
	});
	
	grunt.registerTask('onyx-clone', 'clone onyx', function() {

		var options = this.options({
			tag : '2.4.0',
			lib : path.resolve('lib'),
		});

		console.log(options);

		grunt.config.set('gitclone.onyxClone', {
			options : {
				repository : 'https://github.com/enyojs/onyx.git',
				branch : options.tag,
				directory : onyx
			}
		});

		grunt.config.set('symlink.onyxLink', {
			// Enable overwrite to delete symlinks before recreating them
			options : {
				overwrite : false
			},
			files : {
				'lib/contrib/onyx': onyx
				
			}
		});
		
		try {
			// Query the entry
			var files = fs.readdirSync(onyx);
		} catch (e) {
			grunt.task.run('gitclone:onyxClone');
			
		}
		console.log('gitclone.onyxClone');
		grunt.task.run('symlink:onyxLink');
		
		grunt.verbose.ok();
	});
};