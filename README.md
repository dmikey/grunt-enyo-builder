grunt-enyo-builder
==================

simplified enyo build process. bring a local version of enyo with your project, locking in for build.

build the required enyo version and your application in one swoop.

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

add the task to an existing grunt task if you choose

    grunt.registerTask('default', 'enyo-builder');

run the build process in the top level of your source.

    grunt enyo-builder


requirements

* deploy.json in top level of source
* grunt-git
* grunt-contrib-clean
* grunt-exec

wish list

* test more scenarios
* remove need to build Enyo, without modifying lock-in option
* multiple enyo version support
* centralized enyo management

shortcomings

* stores enyo in node_modules localized location

how it works

clones the enyo core repo to node_modules (todo: add tag support), uses core deploy.js to manage a build. Produces files in dist.

why I made this

had a need for a fluid way to build enyo components. We utilize enyo to build a vast assortment of silo'd components, it's nice to have a grunt task to include with other dev tasks.

what you do not get

there is no template, or boiler plate here. this plug in assumes you are comfortable with scaffolding your own application, or are using another scaffold.