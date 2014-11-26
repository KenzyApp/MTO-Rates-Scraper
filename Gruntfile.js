module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    shell: {
      wu: {
        command: 'casperjs --config=casper.json src/wu.js'
      },
      mg: {
        command: 'casperjs --config=casper.json src/mg.js'
      },
      bog: {
        command: 'casperjs --config=casper.json src/bog.js'
      }
    },

    concurrent: {
      dist: [
        'shell:wu',
        'shell:mg',
        'shell:bog'
      ]
    }

  });

  grunt.registerTask('default', ['concurrent:dist']);

};
