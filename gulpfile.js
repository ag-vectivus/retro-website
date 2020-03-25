const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function style() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/style'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
      directory: true
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./dist/*.html').on('change', browserSync.reload);
  gulp.watch('./dist/script/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;