const gutil = require('gulp-util');
const gulp = require('gulp');

gulp.task('css', () => {
  const sass = require('gulp-sass');
  
  return gulp.src('./client/styles/style.css')
    .pipe(
      sass({ outputStyle: 'compressed' }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./public/css'))
});

gulp.task('favicons', () => {
  const favicons = require('gulp-favicons');

  return gulp.src('icon.png')
    .pipe(favicons({}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./public/icons/'));
});