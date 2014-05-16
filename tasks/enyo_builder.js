/*
 * grunt-enyo-builder
 * https://github.com/toxigenicpoem/grunt-enyo-builder
 *
 * Copyright (c) 2014 Derek M. Anderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var path = require('path');
    var fs = require('fs');
    var modulepath = path.resolve('node_modules/grunt-enyo-builder');
    var enyo = modulepath + '/enyo';

    grunt.registerTask('enyo-builder', 'build an enyo component easily', function () {

        var buildCmd = grunt.template.process('nodejs <%= deploypath %> -T -e <%= enyo %> -s <%= dir %> -o <%= dir %>/dist', {
                data: {
                    deploypath: enyo + '/tools/deploy.js',
                    dir: process.cwd(),
                    enyo: enyo,
                    modulepath: modulepath
                }
            });

        grunt.config.set('gitclone.enyoClone', {
                options: {
                    repository: 'https://github.com/enyojs/enyo.git',
                    branch: '2.4.1-pre',
                    directory: enyo
                }
        });

        grunt.config.set('exec.enyoClone', {
            cmd: buildCmd
        });

        grunt.config.set('clean.enyo', ['build']);

        grunt.loadNpmTasks('grunt-git');
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-exec');

        //grab enyo source for building
        try {
            // Query the entry
            stats = fs.lstatSync(enyo);
        }
        catch (e) {
            grunt.task.run('gitclone:enyoClone');
        }

        grunt.task.run('exec:enyoClone');
        grunt.task.run('clean');
        grunt.verbose.ok();

    });

};