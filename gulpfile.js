
'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    minify      = require('gulp-minify'),
    plumber     = require('gulp-plumber'),
    zip         = require('gulp-zip'),
    imagemin    = require('gulp-imagemin'),
    cssmin      = require('gulp-clean-css'),
    jshint      = require('gulp-jshint');
   


gulp.task('default', ['js','watch']);


//压缩 js 文件
gulp.task('js', function(){
    return gulp.src('app/scripts/**/*.js')
        .pipe(plumber())
        .pipe(minify())
        .pipe(gulp.dest("dist/scripts"))
        .pipe(browserSync.stream());
});

//打包发布目标文件
gulp.task('publish', function(){
    return gulp.src('dist/**/*')
        .pipe(plumber())
        .pipe(zip('publish.zip'))
        .pipe(gulp.dest('release'))
});


// gulp.watch() 函数可实现对文件的监控
gulp.task('watch', function () {
   gulp.watch('app/scripts/**/*.js', ['js']);
   gulp.watch('app/style/*.css', ['testCssmin']);
});


// 压缩 png/jpg/git/svg 格式图片文件
gulp.task('testImagemin', function () {
    gulp.src('app/img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


//压缩CSS文件
gulp.task('testCssmin', function () {
    gulp.src('app/style/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist/style'));
});

//使用jshint 检测 js 文件
gulp.task('testJshint', function () {
    gulp.src('app/scripts/*.js')
    .pipe(jshint())       // 进行检查
    .pipe(jshint.reporter('default')) ; // 对代码进行报错提示
});




