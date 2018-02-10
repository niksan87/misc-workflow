const gulp = require('gulp')
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');

const SOURCEPATHS = {
    sassSource: 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    jsSource: 'src/js/*.js'
}

const APPPATH = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
}

gulp.task('clean-html', function () {
    return gulp.src(APPPATH.root + '/*.html', { read: false, force: true })
        .pipe(clean());
});

gulp.task('clean-scripts', function () {
    return gulp.src(APPPATH.js + '/*.js', { read: false, force: true })
        .pipe(clean());
});

gulp.task('sass', function () {
    return gulp.src(SOURCEPATHS.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(APPPATH.css));
});

gulp.task('copy-scripts', ['clean-scripts'], function () {
    gulp.src(SOURCEPATHS.jsSource)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(APPPATH.js));
})

gulp.task('copy-html', ['clean-html'], function () {
    gulp.src(SOURCEPATHS.htmlSource)
        .pipe(gulp.dest(APPPATH.root));
});

gulp.task('serve', ['sass'], function () {
    browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*html', APPPATH.js + '/*.js'], {
        server: {
            baseDir: APPPATH.root
        }
    })
});

gulp.task('watch', ['serve', 'sass', 'copy-html', 'clean-html', 'clean-scripts', 'copy-scripts'], function () {
    gulp.watch([SOURCEPATHS.sassSource], ['sass']);
    gulp.watch([SOURCEPATHS.htmlSource], ['copy-html']);
    gulp.watch([SOURCEPATHS.jsSource], ['copy-scripts']);
});

gulp.task('default', ['watch']);