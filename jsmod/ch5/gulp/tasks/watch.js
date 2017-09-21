var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

gulp.task('watch', function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir: './'
		}
	});

	watch('./index.html', reload);

	watch('./js/*.js', reload);
});