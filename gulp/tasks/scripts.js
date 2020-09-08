const gulp = require("gulp");
const when = require("gulp-if");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const eslint = require("rollup-plugin-eslint");
const uglify = require("rollup-plugin-uglify-es");
const replace = require("rollup-plugin-replace");
const resolve = require("rollup-plugin-node-resolve");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const rollup = require("gulp-better-rollup");
const changed = require("gulp-changed");
const { argv } = require("yargs");

// Check if gulp scripts --prod or --production has been added to the task
const production = argv.prod || argv.production;

const optionsProd = [
  eslint,
  uglify(),
  resolve({ mainFields: ["jsnext:main"] }),
  commonjs(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  babel({
    babelrc: false,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            browsers: ["last 2 versions"],
          },
        },
      ],
    ],
    ignore: ["./node_modules/"],
  }),
];

const optionsDev = [
  eslint,
  resolve({ mainFields: ["jsnext:main"] }),
  commonjs(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("development"),
  }),
  babel({
    babelrc: false,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            browsers: ["last 2 versions"],
          },
        },
      ],
    ],
    ignore: ["./node_modules/"],
  }),
];

gulp.task("scripts", () =>
  gulp
    .src("./src/scripts/*.js")
    .pipe(changed("./dist/js"))
    .pipe(when(!production, sourcemaps.init()))
    .pipe(when(!production, rollup({ plugins: optionsDev }, { format: "cjs" })))
    .on(
      "error",
      notify.onError({
        title: "Gulp Task Error",
        message: "Error: <%= error.message %>",
      })
    )
    .pipe(when(production, rollup({ plugins: optionsProd }, { format: "cjs" })))
    .on(
      "error",
      notify.onError({
        title: "Gulp Task Error",
        message: "Error: <%= error.message %>",
      })
    )
    .pipe(rename({ basename: "bundle" }))
    .pipe(when(!production, sourcemaps.write("")))
    .pipe(gulp.dest("./dist/js/"))
);
