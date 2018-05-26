var gulp = require('gulp');
	sass = require('gulp-ruby-sass'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    livereload = require('gulp-livereload'),
    del = require('del');


gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts','plugins','data', 'copy', 'copy_includes', 'copy_twig','images', 'serve', 'watch');
});

gulp.task('clean', function() {
	    return del(['dist']);
});


gulp.task('styles', function() {
  return sass('src/styles/scss/main.scss', { style: 'expanded' })
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'))
      .pipe(livereload());
});

gulp.task('plugins', function() {
  return gulp.src('src/scripts/plugins/*.js')
    .pipe(concat('plugins.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
      .pipe(livereload());
});

gulp.task('data', function() {
  return gulp.src('src/data/*')
      .pipe(gulp.dest('./dist/assets/data/'))
      .pipe(livereload());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
      .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'));
});


gulp.task('copy', function () {
    return gulp.src('src/*.php')
        .pipe(gulp.dest('./dist/'))
      .pipe(livereload());
});


gulp.task('copy_includes', function () {
    return gulp.src('src/includes/**/*.php')
        .pipe(gulp.dest('./dist/assets/inc/'))
      .pipe(livereload());
});


//gulp.task('copy', function () {
//    return gulp.src('src/fonts/**/*')
//        .pipe(gulp.dest('./dist/assets/fonts'));
//});

gulp.task('copy_twig', function(){
  return gulp.src('src/includes/**/*.twig')
      .pipe(gulp.dest('./dist/assets/inc/'))
      .pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
  gulp.watch('src/styles/scss/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/*.php', ['copy']);
  gulp.watch('src/data/*', ['data']);
  gulp.watch('src/includes/**/*.php', ['copy_includes']);
  gulp.watch('src/includes/**/*.twig', ['copy_twig']);
  gulp.watch('src/scripts/plugins/*.js', ['plugins']);

});


    var connect = require('gulp-connect-php'),
    browserSync = require('browser-sync');
 
gulp.task('serve', function() {
  connect.server({}, function (){
    browserSync({
      proxy: 'localhost/personal-page/dist/'
    });
  });
 
});