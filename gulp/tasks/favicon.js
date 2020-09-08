const gulp = require("gulp");

gulp.task("favicon", () => gulp.src("src/favicon/*").pipe(gulp.dest("./dist")));
