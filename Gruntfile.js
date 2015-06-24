module.exports = function (grunt) {

    var testOptions = {
        reporter: 'spec',
        quiet: false,
        timeout: 5000
    };


    if (grunt.option('report') === 'xunit') {
        testOptions = {
            reporter: 'xunit-file'
        };
        process.env.XUNIT_FILE = "xunit.xml";
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'server.js', 'app/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            },
            jenkins: {
                options: {
                    reporter: 'checkstyle',
                    reporterOutput: 'build/checkstyle-result.xml'
                },
                src: ['Gruntfile.js', 'app/**/*.js']
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        mochaTest: {
            main: {
                options: testOptions,
                src: ['test/**/*.js']
            }
        },
        run: {
            server: {
                options: {
                    wait: false,
                    ready: 2000
                },
                args: [
                    'server.js'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-run');

    grunt.registerTask('server', ['run:server', 'wait:server']);
    grunt.registerTask('test', ['jshint', 'mochaTest:main']);
};
