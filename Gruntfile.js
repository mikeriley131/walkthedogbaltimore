module.exports = function (grunt) {
    require('time-grunt')(grunt)

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      meta: {
        banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd-HH-MM") %> - Written by <%= pkg.author %> (<%= pkg.contact %>) */\n'
      },

      imagemin: {
        png: {
          options: {
            optimizationLevel: 7
          },
          files: [
            {
              expand: true, // set to true to enable the following options
              cwd: '_assets/src/images/', // cwd is 'current working directory'
              src: ['*.png'], // match all files with this extension
              dest: '_assets/images/', // destination folder for optimized images
              ext: '.png' // give optimized images this extension
            }
          ]
        },
        jpg: {
          options: {
            progressive: true
          },
          files: [
            {
              expand: true,
              cwd: '_assets/src/images/',
              src: ['*.jpg'],
              dest: '_assets/images/',
              ext: '.jpg'
            }
          ]
        }
      },

      svgo: {
        dynamic: {
          files: [{
            expand: true,
            cwd: '_assets/src/images/',
            src: ['*.svg'],
            dest: '_assets/images/'
          }]
        }
      },

      sass: {
        prod: {
          options: {
            style: 'compressed',
            sourcemap: 'none',
            banner: '<%= meta.banner %>'
          },
          files: [{
            expand: true, // Enable dynamic expansion.
            cwd: '_assets/src/scss',
            src: ['*.scss'], // Actual pattern(s) to match.
            dest: '_assets/css/',
            ext: '.min.css' // Dest filepaths will have this extension.
          }]
        },
        dev: {
          options: {
            style: 'expanded',
            sourcemap: 'none',
            banner: '<%= meta.banner %>'
          },
          files: [{
            expand: true, // Enable dynamic expansion.
            cwd: '_assets/src/scss',
            src: ['*.scss'], // Actual pattern(s) to match.
            dest: '_assets/css/',
            ext: '.css' // Dest filepaths will have this extension.
          }]
        }
      },

      sasslint: {
        options: {
          configFile: '_config/.sass-lint.yml',
          formatter: 'html',
          outputFile: '_config/sass-lint-output.html'
        },
        target: ['_assets/src/scss/partials/*.scss']
      },

      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 2 versions', 'safari 8', 'ie 8', 'ie 9']
          },
          files: {
            '_assets/css/main.css': '_assets/css/main.css',
            '_assets/css/main.min.css': '_assets/css/main.min.css'
          }
        }
      },

      uglify: {
        options: {
          banner: '<%= meta.banner %>',
          report: 'min'
        },
        target: {
          files: {
            '_assets/js/main.min.js': ['_assets/src/js/*.js']
          }
        }
      },

      watch: {
        images: {
          files: ['_assets/src/images/*.{png,jpg,gif}'],
          tasks: ['imagemin']
        },
        svgs: {
          files: ['_assets/src/images/*.svg'],
          tasks: ['svgo']
        },
        css: {
          files: '**/*.scss',
          tasks: ['sass', 'sasslint', 'autoprefixer']
        },
        scripts: {
          files: '_assets/src/js/*.js',
          tasks: ['uglify']
        }
      },

      browserSync: {
        files: ['_assets/**/*.*', '*.html'],
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
    })

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.loadNpmTasks('grunt-svgo')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-sass-lint')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-browser-sync')

    // Custom task
    grunt.registerTask('build', ['imagemin', 'svgo', 'sass:prod', 'sass:dev', 'sasslint', 'autoprefixer:dist', 'uglify'])

    // Default task
    grunt.registerTask('default', ['build', 'browserSync', 'watch'])
  }
