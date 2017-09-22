/**
 * Created by owen-carter on 2017/9/22.
 */
var gulp = require('gulp'),
    less = require('gulp-less');

var paths = {
    less: ['./templates/index.less'],
    html: ['./docs/index.html']
};


gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('docs/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
});

gulp.task('default', ['watch']);