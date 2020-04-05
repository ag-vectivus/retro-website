const gulp          = require("gulp");
const webpack       = require("webpack");
const sass          = require("gulp-sass");
const wait          = require("gulp-wait");
const csso          = require("gulp-csso");
const rename        = require("gulp-rename");
const c             = require("ansi-colors");
const notifier      = require("node-notifier");
const sourcemaps    = require("gulp-sourcemaps");
const fileinclude   = require('gulp-file-include');
const autoprefixer  = require("gulp-autoprefixer");
const browserSync   = require("browser-sync").create();

const showError = function(err) {
    notifier.notify({
        title: "Error in sass",
        message: err.messageFormatted
    });

    console.log(c.red("==============================="));
    console.log(c.red(err.messageFormatted));
    console.log(c.red("==============================="));
};

const server = (cb) => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        open: true,
    });

    cb();
};

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", showError)
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
};

const js = function(cb) { 
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        browserSync.reload();
        cb();
    })
};

const html = function(cb) {
    return gulp.src('src/html/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
};

const htmlReload = function(cb) {
    browserSync.reload();
    cb();
};

const watch = function() {
    gulp.watch("src/js/**/*.js", {usePolling : true}, gulp.series(js));
    gulp.watch("src/scss/**/*.scss", {usePolling : true}, gulp.series(css));
    gulp.watch("src/html/**/*.html", {usePolling : true}, gulp.series(html, htmlReload));
};

const startText = function(cb) {
    console.log(c.yellow(`
        ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
        ───█▒▒░░░░░░░░░▒▒█───
        ────█░░█░░░░░█░░█────
        ─▄▄──█░░░▀█▀░░░█──▄▄─
        █░░█─▀▄░░░░░░░▄▀─█░░█
    `));
    console.log(c.blue('Start :)'));
    cb();
};

exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = watch;
exports.default = gulp.series(startText,css, html, js, server, watch);