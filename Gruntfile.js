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
    includes: {
      html: {
        cwd: 'src/',
        src: [ '*.html', 'includes/*.html' ],
        dest: 'build/',
        options: {
          includeRegexp: /^<%=\s*render\s+['"]?([^'"]+)['"]?\s*%>$/,
          flatten: true
        }
      },
      js: {
        options: {
          includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
          duplicates: false,
          debug: true
        },
        cwd: 'src/javascripts',
        src: ['*.js'],
        dest: 'build/assets/js/',
      },
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
        files: ['src/*.html', 'src/**/*.html'],
        tasks: ['includes:html'],
      },
      css: {
        files: ['src/scss/*.scss', 'src/scss/**.*.scss'],
        tasks: ['compass:dev'],
      },
      js: {
        files: ['src/javascripts/*.js', 'src/javascripts/**/*.js'],
        tasks: ['includes:js'],
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
        command: 'cp -r src/images build/assets'
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
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-hashres');

  grunt.registerTask('build', ['shell:clear', 'jshint', 'includes', 'shell:copyImages', 'shell:copyFonts', 'uglify', 'compass:dist', 'hashres']);
  grunt.registerTask('deploy', ['build', 'shell:deploy']);
  grunt.registerTask('dev', ['jshint', 'includes', 'compass:dev', 'shell:copyImages']);
  grunt.registerTask('server', ['dev', 'watch']);
  grunt.registerTask('default', ['shell:clear', 'dev']);

};
