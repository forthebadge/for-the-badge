const gulp = require("gulp");
const fs = require("fs");
const when = require("gulp-if");
const notify = require("gulp-notify");
const pug = require("gulp-pug");
const data = require("gulp-data");
const size = require("gulp-size");
const { argv } = require("yargs");

// Check if gulp scripts --prod or --production has been added to the task
const production = argv.prod || argv.production;
const { deploy } = argv;

const devLocals = {
  base: "/",
  extension: "",
  badges: fs.readdirSync("./src/images/badges"),
  productionMode: false,
  deployMode: deploy,
};

const prodLocals = {
  base: "",
  extension: ".html",
  badges: fs.readdirSync("./src/images/badges"),
  productionMode: true,
  deployMode: deploy,
};

gulp.task("pug", () =>
  gulp
    .src("./src/views/**/!(_)*.pug")
    .pipe(
      // Get relative path to base directory
      data((file) => {
        const relativePath = file.history[0].replace(file.base, "");
        const depth = (relativePath.match(/\//g) || []).length - 1;
        const relativeRoot =
          depth === 0 ? "./" : new Array(depth + 1).join("./../");
        return {
          relativeRoot,
        };
      })
    )
    .pipe(
      when(
        !production,
        pug({
          pretty: true,
          basedir: "./src/views",
          locals: devLocals,
        })
      )
    )
    .on(
      "error",
      notify.onError({
        title: "Gulp Task Error",
        message: "Error: <%= error.message %>",
      })
    )
    .pipe(
      when(
        production,
        pug({
          basedir: "./src/views",
          locals: prodLocals,
        })
      )
    )
    .on(
      "error",
      notify.onError({
        title: "Gulp Task Error",
        message: "Error: <%= error.message %>",
      })
    )
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest("./dist"))
);
