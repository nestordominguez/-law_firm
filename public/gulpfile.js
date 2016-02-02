var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
var shell = require('gulp-shell');
var exec = require('child_process').exec;
var protractor = require('gulp-protractor').protractor;

/*gulp.task('server', function() {
  var live = new server('server.js');
  live.start();
})*/

gulp.task('server-rails',  shell.task('bundle exec rails s'))

gulp.task('serve', function() {
  browserSync.init({
    browser: 'google-chrome',
    notify:false,
    port:8080,
    server:{
      baseDir:["app"],
      routes:{
        "/bower_components": "bower_components"
      }
    }
  })

  gulp.watch(['app/**/*.*'])
    .on('change', browserSync.reload);
})

gulp.task('coverage', ['test-browser'], function() {
  browserSync.init({
    browser: 'google-chrome',
    notify:false,
    port:8084,
    server:{
      baseDir:["test/coverage"]
    }
  })

  gulp.watch(['app/**/*.*'])
    .on('change', browserSync.reload);
})

gulp.task('test-browser', function(done) {
  new Server({
    configFile:__dirname + '/karma.conf.js',
    singleRun: true,
    reporters:['mocha','coverage']
  }, function() { done();} ).start();
})

gulp.task('test', function() {
  browserSync.init({
    browser: 'google-chrome',
    notify:false,
    port:8081,
    server:{
      baseDir:["test/unit", "app"],
      routes:{
        "/bower_components": "bower_components"
      }
    }
  })

  gulp.watch(['app/**/*.*', 'test/**/*.*'])
    .on('change', browserSync.reload);
})

gulp.task('protractor', function(done) {
  gulp.src(["test/e2e/*.js"])
  .pipe(protractor({
    configFile: "test/protractor.config.js",
    args: ['--baseUrl', 'https://localhost:8000']
  }))
  .on('error', function(e) { throw e });
})
