"use strict"

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jsmin = require('gulp-jsmin');

gulp.task('mincss', function(done) {
    gulp.src(["assets/scss/*.scss", "!assets/scss/_*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());

    done();
});

gulp.task('serve', function(done) {

    browserSync.init({
        server: ''
    });

    gulp.watch(["assets/scss/*.scss", "assets/scss/pages/*.scss", "assets/scss/sections/*.scss"], gulp.series('mincss'));
    gulp.watch(["*.html", "assets/html/*.html"]).on('change', () => {
      browserSync.reload();
      done();
    });
    gulp.watch(["assets/js/*.js", "!assets/js/*.min.js"]).on('change', () => {
        gulp.src(["assets/js/*.js", "!assets/js/*.min.js"])
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("assets/js"));
        browserSync.reload();
        done();
    });
  
    done();
});

gulp.task('default', gulp.series('mincss', 'serve'));