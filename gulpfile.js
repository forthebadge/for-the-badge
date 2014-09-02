var gulp = require("gulp");
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');


var suffix = {suffix: '.min'};
// scripts
gulp.task('scripts', function() {
  gulp.src('./public/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('index.js'))
    .pipe(rename(suffix))
    .pipe(gulp.dest('./public'));
});

// css
gulp.task('css', function() {
  gulp.src('./public/style.css')
    .pipe(cssmin())
    .pipe(rename(suffix))
    .pipe(gulp.dest('./public'))
});

// html
gulp.task('html', function() {
  gulp.src('./public/index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(rename(suffix))
    .pipe(gulp.dest('./public'))
});

gulp.task('svg', function() {
  gulp.src('./public/images/*.svg')
    .pipe(svgmin())
    .pipe(rename(suffix))
    .pipe(gulp.dest('./public/images'))
})

gulp.task('build', ['scripts', 'css', 'html', 'svg']);


