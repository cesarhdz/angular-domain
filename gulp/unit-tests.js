'use strict';

var gulp = require('gulp'),
    karma = require('karma')


gulp.task('test', function(done) {

  return karma.server.start({
    configFile: __dirname + '/../test/karma.conf.js',
  }, done);

});
