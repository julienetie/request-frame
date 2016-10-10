var version = '1.4.3',
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
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

var src = './dist/request-frame.js';

gulp.task('Add header to ES version', function() {
    return gulp.src('./dist/request-frame.es.js')
        .pipe(header(minBanner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('Add header to UMD version', function() {
    return gulp.src('./dist/request-frame.js')
        .pipe(header(minBanner, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist'));
});

// gulp.task('bump', function(){
//   gulp.src(['./bower.json','./package.json'])
//   .pipe(bump({version: version}))
//   .pipe(gulp.dest('./'));
// });


gulp.task('default', [
    'Add header to ES version',
    'Add header to UMD version'
]);
