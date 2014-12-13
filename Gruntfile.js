module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    shell: {
      clear: {
        command: 'rm -rf global'
      },
      wu: {
        command: 'casperjs --config=casper.json src/scrape/wu.js'
      },
      mg: {
        command: 'casperjs --config=casper.json src/scrape/mg.js'
      },
      bog: {
        command: 'casperjs --config=casper.json src/scrape/bog.js'
      },
      analytics: {
        command: 'node src/analytics/run.js'
      },
      tweet: {
        command: 'node src/bot/run.js'
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

  grunt.registerTask('tweet', ['shell:tweet']);

};
