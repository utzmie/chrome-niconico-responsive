'use strict';

const gulp         = require('gulp');
const gutil        = require('gulp-util');
const sass         = require('gulp-sass');
const cssnano      = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');
const rename       = require('gulp-rename');
const plumber      = require('gulp-plumber');


// Browser
// @see https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
	'last 5 version',
	'ie >= 11',
	'ios >= 8',
	'android >= 4.2',
];

// Directory
const PATHS = {
	root: './',
	css:  './css',
	scss: './css/scss',
	js:   './js',
	img:  './img',
}


// 
// Stylesheet
// 
gulp.task('styles', function() {
	return gulp.src( PATHS.scss + '/**/*.scss' )
		.pipe(plumber(function(error) {
			gutil.log(gutil.colors.red(error.message));
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: AUTOPREFIXER_BROWSERS,
			cascade: false
		}))
		.pipe(gulp.dest( PATHS.css ))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest( PATHS.css ))
});

// Without Browser-Sync
gulp.task('watch', ['styles'], function() {
	gulp.watch( PATHS.scss + '/**/*.scss', ['styles']);
}); 

gulp.task('default', function() {
	gulp.start('watch');
});