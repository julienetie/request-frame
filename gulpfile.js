var version = '1.4.3',
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    bump = require('gulp-bump'),
    banner = ['/**',
        ' *  <%= pkg.name %> - requestAnimationFrame & cancelAnimationFrame polyfill for',
        ' *   optimal cross-browser development.',
        ' *    Version:  v<%= pkg.version %>',
        ' *     License:  <%= pkg.license %>',
        ' *      Copyright <%= pkg.author %> 2015 All Rights Reserved.',
        ' *        github:  <%= pkg.repository.url %>',
        ' *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾',
        ' */',
        ''
    ].join('\n'),

    minBanner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @license <%= pkg.license %>',
        ' * Copyright <%= pkg.author %> 2015 All Rights Reserved.',
        ' */',
        ''
    ].join('\n');

var src = [
    './src/amd-wrapper-start.js',
    './src/request-frame.src.js',
    './src/amd-wrapper-end.js'
];

gulp.task('make-min', function() {
    return gulp.src(src)
        .pipe(concat('request-frame.min.js'))
        .pipe(uglify())
        .pipe(header(minBanner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('make', function() {
    return gulp.src(src)
        .pipe(concat('request-frame.js'))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('bump', function(){
  gulp.src(['./bower.json','./package.json'])
  .pipe(bump({version: version}))
  .pipe(gulp.dest('./'));
});




gulp.task('default', ['make-min', 'make', 'bump']);
