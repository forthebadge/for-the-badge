const gulp = require("gulp");
const plumber = require("gulp-plumber");
const changed = require("gulp-changed");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const mozjpeg = require("imagemin-mozjpeg");
const size = require("gulp-size");

const dest = "./dist/images";

gulp.task("images", () =>
  gulp
    .src("src/images/**/*.{gif,jpg,png,svg}")
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Gulp Task Error",
          message: "Error: <%= error.message %>",
        }),
      })
    )
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        mozjpeg({
          quality: 80, // default is 75
          progressive: true,
        }),
        imagemin.optipng(),
        imagemin.svgo(),
      ])
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest(dest))
);
