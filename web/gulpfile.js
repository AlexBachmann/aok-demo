"use strict";

// Gulp dev.
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('./gulp_tasks/config');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

function tasks(task, options) {
    return require('./gulp_tasks/' + task)(gulp, plugins, options);
}

//gulp.task('default', runSequence('sprite', 'sass'));

gulp.task('watch', function(done){
	watch(config.sprite.iconsPathSvg + '/**/*.svg', function(){runSequence('sprite', 'sass');});
	watch(config.sprite.iconsPathPng + '/**/*.png', function(){runSequence('sprite', 'sass');});
});


// Build Production
gulp.task('build', function(done){
    runSequence(
      'clean.dist',
      'sprite',
      'ng-cli.build',
      'copy.build',
      'copy.assets',
      'clean.tmp',
      done
    );
});

gulp.task('ng-cli.build', function(cb){
  exec('node_modules/.bin/ng build', {maxBuffer: 1024 * 500}, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('copy.build', tasks('copy.build'));
gulp.task('copy.assets', tasks('copy.assets'));
gulp.task('clean.tmp', tasks('clean.tmp'));
gulp.task('clean.dist', tasks('clean.dist'));
gulp.task('sprite', tasks('spraitinator'));
