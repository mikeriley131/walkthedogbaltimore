module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - Written by <%= pkg.author %> (<%= pkg.contact %>) */\n'
        },
        sass: {
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none',
                    banner: '<%= meta.banner %>'
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '_assets/scss',
                    src: ['*.scss'],  // Actual pattern(s) to match.
                    dest: '_assets/css/',
                    ext: '.min.css'  // Dest filepaths will have this extension.
                }]
            },
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    banner: '<%= meta.banner %>'
                },
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: '_assets/scss',
                    src: ['*.scss'],  // Actual pattern(s) to match.
                    dest: '_assets/css/',
                    ext: '.css'      // Dest filepaths will have this extension.
                }]
            }
        },
        // Adds vendor prefixes as needed based on caniuse-db
        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
                },
                files:{
                    '_assets/css/main.css':'_assets/css/main.css',
                    '_assets/css/main.min.css':'_assets/css/main.min.css'
                }
            }
        },
        // Uglify
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                report: 'min'
            },
            target: {
                files: '<%= pkg.js %>'
            }
        },
        // Watch
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', [ 'sass:prod','sass:dev', 'autoprefixer:dist' ]);
};