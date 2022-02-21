const gulp = require('gulp');
const {src,dest,watch,parallel,series} = require('gulp');
const re = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const gpjsmin = require('gulp-concat');
const min = require('gulp-terser');
const post = require('gulp-postcss');
const prefix = require('autoprefixer')
const nan = require('gulp-cssnano');

//scss to css

function style(){
    return src('./scss/**/main.scss')
    .pipe(sass())
    .pipe(post([prefix()]))
    .pipe(gpjsmin('style.css'))
    .pipe(nan())
    .pipe(gulp.dest('./css'))
}

function imgmin(){
    return src('./images/*')
    .pipe(re())
    .pipe(gulp.dest('./images'))
}

function jsTask(){
    return src('./js/custom.js')
    .pipe(gpjsmin('script.js'))
    .pipe(min())
    .pipe(gulp.dest('./js'))
}

function watchs(){
    gulp.watch('./scss/**/*.scss',style);
    // gulp.watch('./img/*',imgmin);
    gulp.watch('./js/**/*.js',jsTask);
}
exports.style = style;
exports.imgmin = imgmin;
exports.jsTask = jsTask;
exports.watchs= watchs;
exports.default = parallel(style)
