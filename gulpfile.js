var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('compress-js', function(){
    	gulp.src('js/script.js') // What files do we want gulp to consume?
        .pipe(concat('main.min.js'))

        .pipe(uglify()) // Call the uglify function on these files
        .pipe(gulp.dest('build/js')) // Where do we put the result?
});

gulp.task('message', function(){
console.log('ALL DONE!!!!!!')

});


gulp.task('compress-css', function(){
	gulp.src('css/*.css')
	.pipe(concat('main.css'))
	.pipe(gulp.dest('build/css'))
    


});

gulp.task('watch', function(){
    // Watch the folder specified in our 'scripts' task
    gulp.watch('js/*.js', ['compress-js', 'compress-css']);
     gulp.watch('css/*.css', ['compress-css']);
});

gulp.task('serve', ['compress-css'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

     gulp.watch('css/*.css').on('change', browserSync.reload);

});

// gulp.task('default', ['scripts', 'watch']);

// gulp.task('default', ['compress-css', 'compress-js']);