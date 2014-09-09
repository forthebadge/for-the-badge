var gulp = require("gulp");
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');


gulp.task('scripts', function() {
  gulp.src('./public/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('css', function() {
  gulp.src('./public/style.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./public'));
});

gulp.task('svg', function() {
  gulp.src('./public/badges/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./public/badges'));
  gulp.src('./public/images/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./public/images'));
});

gulp.task('build', ['scripts', 'css', 'svg']);