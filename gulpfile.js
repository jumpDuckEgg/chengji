const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
//编译html
gulp.task('html', function(){
	return gulp.src('index.html')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());
});
//编译resources
gulp.task('resource', function(){
	return gulp.src('./resource/**/*')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('./app/resource/'))
		.pipe(browserSync.stream());
});
//编译css
gulp.task('css', function(){
	return gulp.src('css/*.css')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

//编译js
gulp.task('script', function(){
	return gulp.src('./js/**/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(gulp.dest('./app/js'))
		.pipe(browserSync.stream());
});
//监测变化
gulp.task('browser-sync', ['html', 'resource', 'css', 'script'], function(){
	browserSync.init({
		server: {
            baseDir: "app/"
        }
	});
	//监听文件的变化
	gulp.watch("index.html", ['html']);
	gulp.watch("resource/**/*", ['resource']);
	gulp.watch("css/*.css", ['css']);
	gulp.watch("js/*.js", ['script']);
});
gulp.task('default',['browser-sync'])
