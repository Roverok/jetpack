var gulp        = require('gulp'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    sourcemaps  = require('gulp-sourcemaps'),
    watch       = require('gulp-watch'),
    jade        = require('gulp-jade'),
    stylus      = require('gulp-stylus'),
    fs          = require('fs'),
    del         = require('del'),
    nib         = require('nib')
    karma       = require('karma').server;

var paths = {
    templates: ['src/templates/**/*.jade'],
    scripts: ['src/coffee/*.coffee'], 
    images: ['src/img/**/*'],
    styles: ['src/styles/**/*.styl']
};

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('clean', function() {
  del.sync(['dist/*']);
});

gulp.task('script', function(){
  console.log('script fired');
});

gulp.task('scripts', ['clean'], function() {
  gulp.src(paths.scripts)
        .pipe(watch(paths.scripts), ['script'])
        .pipe(coffee({bare: true}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));  
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(watch(paths.images))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('styles', function () {
  gulp.src(paths.styles)
    .pipe(watch(paths.styles))
    .pipe(stylus({
      use: nib(),
      compress: true
    }))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('templates', function() {
  var locals = {};

  gulp.src(paths.templates)
    .pipe(watch(paths.templates))
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['clean', 'templates', 'scripts', 'images', 'styles']);
