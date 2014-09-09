var gulp = require("gulp");
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');


var suffix = {suffix: '.min'};

gulp.task('scripts', function() {
  gulp.src('./scripts/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./scripts'));
});

gulp.task('css', function() {
  gulp.src('./style.css')
    .pipe(cssmin())
    .pipe(gulp.dest('.'));
});

gulp.task('svg', function() {
  gulp.src('./badges/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./badges'));
  gulp.src('./images/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./images'));
});

gulp.task('build', ['scripts', 'css', 'svg']);