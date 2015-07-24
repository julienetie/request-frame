var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('build', function() {
    return gulp.src('./src/request-frame.src.js')
        .pipe(rename('request-frame.js'))
        .pipe(gulp.dest('./'))
        .pipe(uglify())
        .pipe(rename('request-frame.min.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);
