var gulp = require('gulp'),
    plug = require('gulp-load-plugins')();


gulp.task('style', ['fonts'], function() {
  return gulp.src([
      './bower_components/angular/angular-csp.min.css',
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
      './bower_components/angular-motion/dist/angular-motion.min.css',
      './app/css/style.less'
    ])
    .pipe(plug.if('*.less', plug.less()))
    .pipe(plug.concat('style.css'))
    .pipe(plug.autoprefixer(["> 1%"], {cascade:true}))
    .pipe(gulp.dest('./dist/bundle'))
    .pipe(plug.filesize());
});


gulp.task('fonts', function() {
  return gulp.src('./bower_components/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});


gulp.task('js:vendor', function() {
  return gulp.src([
      './bower_components/angular/angular.min.js',

      './bower_components/angular-animate/angular-animate.min.js',

      './bower_components/angular-strap/dist/modules/dimensions.min.js',
      './bower_components/angular-strap/dist/modules/navbar.min.js',
      './bower_components/angular-strap/dist/modules/tooltip.{min,tpl.min}.js',
      './bower_components/angular-strap/dist/modules/dropdown.{min,tpl.min}.js',
      './bower_components/angular-strap/dist/modules/modal.{min,tpl.min}.js',
      './bower_components/angular-strap/dist/modules/alert.{min,tpl.min}.js',
      './bower_components/angular-strap/dist/modules/popover.{min,tpl.min}.js'

    ])
    .pipe(plug.concat('vendor.js'))
    .pipe(plug.uglify())
    .pipe(gulp.dest('./dist/bundle'))
    .pipe(plug.filesize());
});



gulp.task('js:app', function() {
  return gulp.src('./app/**/*.js')
    .pipe(plug.ngAnnotate())
    .pipe(plug.wrapper({
       header: '\n(function(/* ${filename} */){\n',
       footer: '\n})();\n'
    }))
    .pipe(plug.concat('app.js'))
    .pipe(gulp.dest('./dist/bundle'))
    .pipe(plug.filesize());
});



gulp.task('js:app:min', ['js:app'], function() {
  return gulp.src('./dist/bundle/app.js')
    .pipe(plug.uglify())
    .pipe(plug.concat('app.min.js'))
    .pipe(gulp.dest('./dist/bundle'))
    .pipe(plug.filesize());
});


gulp.task('img', function() {
  return gulp.src('./app/img/*')
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('tpl', function() {
  return gulp.src('./app/tpl/*')
    .pipe(gulp.dest('./dist/tpl'));
});


gulp.task('html', function() {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(plug.jshint())
    .pipe(plug.jshint.reporter())
    .pipe(plug.jshint.reporter('fail'));
});


gulp.task('clean', function() {
  return gulp.src('./dist/*', {read: false})
    .pipe(plug.rimraf());
});


gulp.task('build', ['js:vendor', 'js:app', 'style', 'img', 'tpl', 'html']);


gulp.task('default', ['lint', 'build']);


gulp.task('watch', ['build'], function() {
  plug.livereload.listen();

  gulp.watch('./dist/**/*')
    .on('change', plug.livereload.changed);

  gulp.watch('./app/**/*.js', ['js:app']);
  gulp.watch('./app/css/**/*.{less,css}', ['style']);
  gulp.watch('./app/img/**/*', ['img']);
  gulp.watch('./app/tpl/**/*', ['tpl']);
  gulp.watch('./app/*.html', ['html']);
});