'use strict';

// This is the default port that livereload listens on;
// change it if you configure livereload to use another port.
var LIVERELOAD_PORT = 35787;
// lrSnippet is just a function.
// It's a piece of Connect middleware that injects
// a script into the static served html.
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
// All the middleware necessary to serve static files.
var livereloadMiddleware = function (connect, options) {
	return [
    // Inject a livereloading script into static files.
    lrSnippet,
    // Serve static files.
    connect.static(options.base),
    // Make empty directories browsable.
    connect.directory(options.base)
	];
};

//Grunt is just JavaScript running in node, after all...
module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-bumpup');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');

	// All upfront config goes in a massive nested object.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", '.tmp'],
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!scripts/**', '!bower_components/**', '!js/**', '!**/*.css'],
                dest: 'dist/'
            }
        },
        rev: {
            files: {
                src: ['dist/**/*.{js,css}']
            }
        },
        useminPrepare: {
            html: 'app/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
		connect: {
			test: {
				options: {
					// The server's port, and the folder to serve from:
					// Ex: 'localhost:9000' would serve up 'client/index.html'
					base: './App/',
					hostname: 'localhost',
					livereload:true,
					port: 9001,
					keepalive: false
				}
			}
		},
		// The watch task is used to run tasks in response to file changes
		watch: {
			// '**' is used to include all subdirectories
			// and subdirectories of subdirectories, and so on, recursively.
			files: ['App/less/*.less'],
			// In our case, we don't configure any additional tasks,
			// since livereload is built into the watch task,
			// and since the browser refresh is handled by the snippet.
			// Any other tasks to run (e.g. compile CoffeeScript) go here:
			tasks: ['less'],
			options: {
				//livereload: LIVERELOAD_PORT
			}
		}, less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"App/css/main.css": "App/less/main.less" // destination file and source file
				}
			}
		},



	});
	grunt.registerTask('build', ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin' ]);
	grunt.registerTask('default', ['connect', 'watch']);
};
