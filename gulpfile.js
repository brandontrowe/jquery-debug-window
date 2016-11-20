const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('convert', function() {
    gulp.src('src/css/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false,
            remove: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
    gulp.src('src/js/jquery.debug-window.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('build', function() {
    gulp.src('src/css/scss/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false,
            remove: true
        }))
        .pipe(gulp.dest('build/css'));
    gulp.src('src/js/jquery.debug-window.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['convert'], function() {

    // Watch and convert SASS/SCSS files
    gulp.watch('src/css/scss/**/*.scss', ['convert']);

    // Watch JS files
    gulp.watch('src/js/jquery.debug-window.js', ['convert']);
});
