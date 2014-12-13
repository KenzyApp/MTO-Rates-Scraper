module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    shell: {
      clear: {
        command: 'rm -rf global'
      },
      wu: {
        command: 'casperjs --config=casper.json src/wu.js'
      },
      mg: {
        command: 'casperjs --config=casper.json src/mg.js'
      },
      bog: {
        command: 'casperjs --config=casper.json src/bog.js'
      },
      analytics: {
        command: 'node src/analytics.js'
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

  grunt.registerTask('default', [
    'shell:clear',
    'concurrent:dist',
    'shell:analytics'
  ]);

};
