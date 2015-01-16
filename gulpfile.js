'use strict';

var fs = require('fs');
var gulp = require('gulp');
var p = require('gulp-load-plugins')();

var handle = function(err) {
  console.log(err); this.emit('end');
};

gulp.task('server', function() {
  return p.connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
});

gulp.task('jade', function() {
  var locals = {badges: fs.readdirSync('./src/images/badges')};
  return gulp.src('src/views/*.jade')
    .pipe(p.jade({locals: locals}))
    .on('error', handle)
    .pipe(gulp.dest('dist/'))
    .pipe(p.connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('src/style/style.scss')
    .pipe(p.sass({outputStyle: 'compressed'}))
    .on('error', handle)
    .pipe(gulp.dest('dist/'))
    .pipe(p.connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(p.concat('main.js'))
    .on('error', handle)
    .pipe(p.uglify())
    .on('error', handle)
    .pipe(gulp.dest('dist/'))
    .pipe(p.connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(p.imagemin())
    .on('error', handle)
    .pipe(gulp.dest('dist/images'))
    .pipe(p.connect.reload());
});

gulp.task('swf', function() {
  return gulp.src('src/scripts/*.swf')
    .pipe(gulp.dest('dist'));
});

gulp.task('badges', function() {
  return gulp.src('src/images/badges/**/*')
    .pipe(p.imagemin())
    .on('error', handle)
    .pipe(gulp.dest('dist/badges'));
});

gulp.task('watch', function() {
  gulp.watch('src/views/**/*.jade', ['jade']);
  gulp.watch('src/style/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['server', 'jade', 'sass', 'scripts', 'images', 'swf', 'watch']);
gulp.task('build', ['jade', 'sass', 'scripts', 'images', 'swf', 'badges']);
