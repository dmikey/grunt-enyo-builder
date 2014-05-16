grunt-enyo-builder
==================

simplified enyo build process. bring a local version of enyo with your project, locking in for build.

build the required enyo version and your application in one swoop.

install

    npm install grunt-enyo-builder

register the tasks to your grunt file

    grunt.loadNpmTasks('grunt-enyo-builder');

run the build process in the top level of your source.

    grunt enyo_builder


requirements

* deploy.json in top level of source

wish list

* test more scenarios
* remove need to build Enyo, without modifying lock-in option
* multiple enyo version support
* centralized enyo management

why I made this

had a need for a fluid way to build enyo components. We utilize enyo to build a vast assortment of silo'd components, it's nice to have a grunt task to include with other dev tasks.

what you do not get

there is no template, or boiler plate here. this plug in assumes you are comfortable with scafolding your own application, or are using another scafold.