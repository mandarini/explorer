const gulp = require('gulp');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

function copy() {
    return gulp.src([
        'app/*.html',
        'app/**/*.jpg',
        'app/**/*.json',
        './service-worker.js'
    ])
        .pipe(gulp.dest('docs'));
}
gulp.task('copy', copy);

function serve() {
    return browserSync.init({
        server: 'build',
        open: false,
        port: 3000
    });
}

function processJs() {
    return gulp.src('app/scripts/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('docs/scripts'));
}

gulp.task('processJs', processJs);

function processCss() {
    return gulp.src('app/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('docs/styles'));
}
 
gulp.task('processCss', processCss);

function watch() {
    gulp.watch('app/scripts/*.js', processJs);
    gulp.watch('app/styles/*.css', processCss);
}

gulp.task('watch', watch);

gulp.task('buildAndServe', gulp.series(processJs, processCss, copy, serve));