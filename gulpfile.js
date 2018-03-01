'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// Servidor web de desarrollo
gulp.task('server', function(){
  connect.server({
    root: './src',
    port: 5555,
    livereload: true
  });
})

// Compila el html
gulp.task('html', function() {
  gulp.src('./src/index.html')
    .pipe(connect.reload());
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src([
    './src/js/index.js',
    './src/js/component/**/*.js',
    './src/js/service/**/*.js',
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('./index.build.js'))
    .pipe(gulp.dest('./src/js/'))
    .pipe(connect.reload());
});

// Preprocesa archivos SASS a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./src/css/index.scss')
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))// compact | compressed
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(concat('./index.build.css'))
    .pipe(gulp.dest('./src/css/'))
    .pipe(connect.reload());
});

// Dependencias
gulp.task('dependencias-js', function() {
  return gulp.src([
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js',
    './node_modules/angular-animate/angular-animate.min.js',
    './node_modules/angular-google-analytics/dist/angular-google-analytics.min.js',
    './node_modules/zepto/dist/zepto.min.js'
  ])
    .pipe(concat('./vendors.min.js'))
    .pipe(gulp.dest('./src/js/'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./src/index.html'], ['html']);
  gulp.watch(['./src/css/**/*.scss'], ['css']);
  gulp.watch(['./src/js/**/*.js', './gulpfile.js'], ['jshint']);
});

gulp.task('default', ['server','html','css','jshint','dependencias-js','watch']);