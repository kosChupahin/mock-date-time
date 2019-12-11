const gulp = require('gulp');
const vinyl = require('vinyl-paths');
const del = require('del');

const LIB_PATH = './lib';
const JS_PATH = './src/mockdate.js';

function cleanTask() {
  return gulp.src(LIB_PATH, { allowEmpty: true })
    .pipe(vinyl(del));
}

function babelTask() {
  return gulp.src(JS_PATH)
    .pipe(gulp.dest(LIB_PATH));
}

exports.default = gulp.series(
  cleanTask,
  gulp.parallel(
    babelTask,
  ),
);
