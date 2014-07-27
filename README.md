grunt-enyo-builder
==================

Download and link the enyo and optional onyx and layout libraries in your project structure.
This allows your project source code to be shipped without these libraries.

Build enyo in the required version, libraries and your app in one go.


install

    npm install grunt-enyo-builder

register the tasks to your grunt file

    grunt.loadNpmTasks('grunt-enyo-builder');

set the tag for the version of enyo to build against

    grunt.initConfig({
        "enyo-builder": {
            "production": {
                options: {
                    tag: "2.4.0"
                }
            },
        },
    });
    
create a setup task to download the libraries so you can run debug.

    grunt.registerTask('setup',['enyo-clone','onyx-clone','layout-clone']);

add the task to an existing grunt task if you choose

    grunt.registerTask('default', 'enyo-builder');

setup your enyo environment

    grunt setup
    
or download the libraries manualy

    grunt clone-enyo / grunt clone-onyx / grunt clone-layout

run the build process in the top level of your source.

    grunt enyo-builder


requirements

* deploy.json in top level of source
* grunt-git
* grunt-contrib-clean
* grunt-exec
* grunt-contrib-symlink

wish list

* test more scenarios
* remove need to build Enyo, without modifying lock-in option
* multiple enyo version support
* centralized enyo management

shortcomings

* stores enyo in node_modules localized location, solved by symlinking

how it works

clones the enyo core repo to node_modules (todo: add tag support), uses core deploy.js to manage a build. Produces files in dist.

why I made this

had a need for a fluid way to build enyo components. We utilize enyo to build a vast assortment of silo'd components, it's nice to have a grunt task to include with other dev tasks.

what you do not get

there is no template, or boiler plate here. this plug in assumes you are comfortable with scaffolding your own application, or are using another scaffold.
