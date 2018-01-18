'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var config = {
    srcCss: 'src/scss/**/*.scss',
    buildCss: 'build/css'
};

gulp.task('scss', function () {
    return gulp.src(config.srcCss)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMap: true
        }).on('error', sass.logError))
        .pipe(autoprefixer({}))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildCss));
});

gulp.task('watch', function () {
    gulp.watch(config.srcCss, ['scss']);
});

gulp.task('default', ['scss', 'watch']);