const gulp = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

gulp.task("generator", () =>
  gulp
    .src("src/generator/**/*")
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Gulp Task Error",
          message: "Error: <%= error.message %>",
        }),
      })
    )
    .pipe(gulp.dest(`./dist/generator`))
);
