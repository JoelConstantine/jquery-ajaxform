module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			build: {
				files: {
					'jquery.ajaxForm.min.js': ['jquery.ajaxForm.js']
				}
			}
		},
    jshint: {
      all: ['src/*.js']
    },
    concat: {
      build: {
        src: ['src/**/*.js'],
        dest: 'jquery.ajaxForm.js'
      }
    },
    watch: {
      js: {
        files: ['src/*.js'],
        tasks: ['jsBuild'],
        options: {
          spawn: false
        }
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
  grunt.registerTask('jsBuild', ['jshint:all', 'concat', 'uglify'])
};