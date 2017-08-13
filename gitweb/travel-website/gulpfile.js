var gulp = require('gulp'),
	watch = require('gulp-watch');

gulp.task('default', function(){
	console.log('testing default task');
});

gulp.task('styles', function(){
	console.log('sass/less compilation test');
});

gulp.task('watch', function(){
	watch('./app/index.html', function(){
		gulp.start('default');
	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('styles');
	});
});