module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    remoteUser: 'deployer',
    remoteHost: '162.243.45.15',
    remoteDir: '/home/deployer/www/current',
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
      },
      dist: {
        files: {
          'build/assets/js/cusd.js': 'build/assets/js/cusd.js',
          'build/assets/js/head.js': 'build/assets/js/head.js',
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      head: {
        src: [
          'src/javascripts/lib/vendor/modernizr.js', 
          'src/javascripts/head.js'
          ],
        dest: 'build/assets/js/head.js',
      },
      cusd: {
        src: [
          'src/javascripts/lib/vendor/jquery.js', 
          'src/javascripts/lib/foundation/foundation.js', 
          'src/javascripts/lib/foundation/foundation.reveal.js',
          'src/javascripts/lib/foundation/foundation.topbar.js',
          'src/javascripts/cusd.js'
          ],
        dest: 'build/assets/js/cusd.js',
      },
    },
    includes: {
      html: {
        cwd: 'src/',
        src: [ '*.html', 'includes/*.html', 'modals/*.html', '*.php', ],
        dest: 'build/',
        options: {
          includeRegexp: /^<%=\s*render\s+['"]?([^'"]+)['"]?\s*%>$/,
          flatten: true
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'build/assets/css',
          environment: 'production',
          force: true
        }
      },
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'build/assets/css'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/javascripts/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['src/*.html', 'src/**/*.html', 'src/*.php'],
        tasks: ['includes:html'],
      },
      css: {
        files: ['src/scss/*.scss', 'src/scss/**.*.scss'],
        tasks: ['compass:dev'],
      },
      js: {
        files: ['src/javascripts/*.js', 'src/javascripts/**/*.js'],
        tasks: ['concat'],
      },
    },
    shell: {
      clear: {
        command: 'rm -rf build'
      },
      deploy: {
        command: 'cd ./build && rsync -r --del . <%= remoteUser %>@<%= remoteHost %>:<%= remoteDir %>'
      },
      copyImages: {
        command: 'cp -r src/images build/assets'
      },
      copyFonts: {
        command: 'cp -r src/fonts build/assets'
      }
    },
    hashres: {
      options: {
        fileNameFormat: '${name}-${hash}.${ext}',
        renameFiles: true
      },
      css: {
        src: 'build/assets/css/*.css',
        dest: 'build/**/*.html'
      },
      js: {
        src: 'build/assets/js/*.js',
        dest: 'build/**/*.html'
      },
      images: {
        src: [
          'build/**/*.png',
          'build/**/*.gif',
          'build/**/*.jpg',
          'build/**/*.ico',
          'build/**/*.svg'
        ],
        dest: [
          'build/**/*.html',
          'build/**/*.js',
          'build/**/*.css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-hashres');

  grunt.registerTask('build', ['shell:clear', 'jshint', 'includes', 'concat', 'compass:dist', 'shell:copyImages', 'shell:copyFonts', 'uglify', 'hashres']);
  grunt.registerTask('deploy', ['build', 'shell:deploy']);
  grunt.registerTask('dev', ['shell:clear', 'jshint', 'includes', 'concat', 'compass:dev', 'shell:copyImages', 'shell:copyFonts']);
  grunt.registerTask('default', ['dev', 'watch']);

};
