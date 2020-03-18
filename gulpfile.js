const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// compile scs into css
function style() {
  // 1. where is my scss file
  return gulp.src('./src/scss/**/*.scss')
  // 2. pass that file through sass compiler
    .pipe(sass({
      outputStyle : "compressed" //code style - extended, nested, copressed, compact
    }).on('error', sass.logError))
  // Use autoprefixer
    .pipe(autoprefixer())
  // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./dist/style'))
  // 4. stream changes to all browser
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