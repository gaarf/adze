var gulp = require('gulp'),
    plug = require('gulp-load-plugins')(),
    pkg = require('./package.json'),
    merge = require('merge-stream');

function plumber() {
  return plug.plumber({ errorHandler: function (err) {  
    plug.util.beep();
    plug.util.log(plug.util.colors.red(err.toString()));
  } });
}

gulp.task('css:lib', ['fonts'], function() {
  return gulp.src([
      './bower_components/angular/angular-csp.css',
      './bower_components/bootstrap/dist/css/bootstrap.min.css',
      './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
      './bower_components/angular-motion/dist/angular-motion.min.css'
    ])
    .pipe(plug.concat('lib.css'))
    .pipe(gulp.dest('./dist/bundle'));
});

gulp.task('fonts', function() {
  return gulp.src('./bower_components/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('css:app', function() {
  return gulp.src([
      './app/js/directives/**/*.{less,css}',
      './app/css/style.less'
    ])
    .pipe(plumber())
    .pipe(plug.if('*.less', plug.less()))
    .pipe(plug.concat('app.css'))
    .pipe(plug.autoprefixer(["> 1%"], {cascade:true}))
    .pipe(gulp.dest('./dist/bundle'));
});


gulp.task('js:lib', function() {
  return gulp.src([
      './bower_components/angular/angular.js',

      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-resource/angular-resource.js',

      './bower_components/angular-ui-router/release/angular-ui-router.js',

      './bower_components/angular-strap/dist/modules/dimensions.js',
      './bower_components/angular-strap/dist/modules/tooltip.{js,tpl.js}',
      './bower_components/angular-strap/dist/modules/dropdown.{js,tpl.js}',
      './bower_components/angular-strap/dist/modules/modal.{js,tpl.js}',
      './bower_components/angular-strap/dist/modules/alert.{js,tpl.js}',
      './bower_components/angular-strap/dist/modules/popover.{js,tpl.js}'

    ])
    .pipe(plug.concat('lib.js'))
    .pipe(gulp.dest('./dist/bundle'));
});


gulp.task('js:app', function() {
  var PKG = JSON.stringify({
    name: pkg.name,
    v: pkg.version
  });
  return gulp.src('./app/**/*.js')
    .pipe(plumber())
    .pipe(plug.ngAnnotate())
    .pipe(plug.wrapper({
       header: '\n(function (PKG){ /* ${filename} */\n',
       footer: '\n})('+PKG+');\n'
    }))
    .pipe(plug.concat('app.js'))
    .pipe(gulp.dest('./dist/bundle'));
});



gulp.task('img', function() {
  return gulp.src('./app/img/*')
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('tpl', function() {
  return merge(

    gulp.src([
      './app/js/directives/**/*.tpl'
    ])

      .pipe(plug.angularTemplatecache({
        module: pkg.name + '.directives'
      })),

    gulp.src([
      './app/partials/home.html'
    ])

      .pipe(plug.angularTemplatecache({
        module: pkg.name,
        base: __dirname + '/app',
        root: '/'
      }))

  )
    .pipe(plug.concat('tpl.js'))
    .pipe(gulp.dest('./dist/bundle'));
});


gulp.task('html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist'));
});


gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(plug.jshint())
    .pipe(plug.jshint.reporter())
    .pipe(plug.jshint.reporter('fail'));
});
gulp.task('jshint', ['lint']);
gulp.task('hint', ['lint']);


gulp.task('clean', function() {
  return gulp.src('./dist/*', {read: false})
    .pipe(plug.rimraf());
});


gulp.task('js:minify', ['js'], function() {
  return gulp.src('./dist/bundle/{app,lib}.js')
    .pipe(plug.uglify())
    .pipe(gulp.dest('./dist/bundle'))
    .pipe(plug.size({showFiles:true, gzip:true, total:false}));
});

gulp.task('minify', ['js:minify']);

gulp.task('lib', ['js:lib', 'css:lib']);
gulp.task('app', ['js:app', 'css:app']);
gulp.task('js', ['js:lib', 'js:app']);
gulp.task('css', ['css:lib', 'css:app']);
gulp.task('style', ['css']);

gulp.task('build', ['js', 'css', 'img', 'tpl', 'html']);

gulp.task('default', ['lint', 'build', 'js:minify']);

gulp.task('watch', ['build'], function() {
  plug.livereload.listen();

  gulp.watch('./dist/**/*')
    .on('change', plug.livereload.changed);

  gulp.watch('./app/**/*.js', ['js:app']);
  gulp.watch('./app/**/*.{less,css}', ['css:app']);
  gulp.watch(['./app/js/directives/**/*.tpl', './app/partials/home.html'], ['tpl']);
  gulp.watch('./app/**/*.html', ['html']);
  gulp.watch('./app/img/**/*', ['img']);

});
