var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('build', function() {
    return gulp.src([ 
        './src/amd-wrapper-start.js',
        './src/request-frame.src.js',
        './src/amd-wrapper-end.js'
        ])
        .pipe(concat('request-frame.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(concat('request-frame.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);
