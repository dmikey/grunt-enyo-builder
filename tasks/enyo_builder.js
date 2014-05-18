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

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerMultiTask('enyo-builder', 'build an enyo component easily', function () {

        var options = this.options({
            tag: '2.4.0',
            lib: path.resolve('lib'),
        });

        console.log(options);

        var buildCmd = grunt.template.process('nodejs <%= deploypath %> -T -e <%= enyo %> -s <%= dir %> -o <%= dir %>/dist -l <%= lib %>', {
            data: {
                deploypath: enyo + '/tools/deploy.js',
                dir: process.cwd(),
                enyo: enyo,
                modulepath: modulepath,
                lib: options.lib
            }
        });

        grunt.config.set('gitclone.enyoClone', {
            options: {
                repository: 'https://github.com/enyojs/enyo.git',
                branch: options.tag,
                directory: enyo
            }
        });

        grunt.config.set('exec.enyoClone', {
            cmd: buildCmd
        });

        grunt.config.set('clean.enyoBuild', ['build']);

        try {
            // Query the entry
            var files = fs.readdirSync(enyo);
        } catch (e) {
            grunt.task.run('gitclone:enyoClone');
        }

        grunt.task.run('exec:enyoClone');
        grunt.task.run('clean:enyoBuild');
        grunt.verbose.ok();

    });

};