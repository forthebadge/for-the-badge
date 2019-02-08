'use strict';

const fs = require('fs');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const p = require('gulp-load-plugins')();

const handle = function(err) {
  console.log(err);
  this.emit('end');
};

// function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('jade', function() {
  var locals = { badges: fs.readdirSync('./src/images/badges') };
  return gulp
    .src('src/views/*.jade')
    .pipe(p.jade({ locals: locals }))
    .on('error', handle)
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
  return gulp
    .src('src/style/style.scss')
    .pipe(p.sass({ outputStyle: 'compressed' }))
    .on('error', handle)
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(p.concat('main.js'))
    .on('error', handle)
    .pipe(p.uglify())
    .on('error', handle)
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  return gulp
    .src('src/images/**/*')
    .pipe(p.imagemin())
    .on('error', handle)
    .pipe(gulp.dest('dist/images'));
});

gulp.task('favicon', function() {
  return gulp.src('src/images/favicon/*').pipe(gulp.dest('dist'));
});

gulp.task('badges', function() {
  return gulp
    .src('src/images/badges/**/*')
    .pipe(p.imagemin())
    .on('error', handle)
    .pipe(gulp.dest('dist/badges'));
});

// 'gulp serve' -- open site in browser and watch for changes
// in source files and update them when needed
gulp.task('serve', done => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    port: 8000,
    open: false,
    notify: false,
    logConnections: false,
    server: {
      baseDir: 'dist',
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });
  done();

  // watch various files for changes and do the needful
  gulp.watch('src/views/**/*.jade', gulp.series('jade', reload));
  gulp.watch('src/style/**/*.scss', gulp.series('sass', reload));
  gulp.watch('src/scripts/**/*.js', gulp.series('scripts', reload));
  gulp.watch('src/images/**/*', gulp.series('images', reload));
});

gulp.task('build', gulp.series('jade', 'sass', 'scripts', 'images', 'favicon'));

gulp.task('default', gulp.series('build', 'serve'));
gulp.task('build', gulp.series('build'));
