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
// Build for Development
gulp.task('process:svg:new', function(done){
    console.log('Generate png images for both platforms (android / ios) out of svg files in the resources/private/icons/svg directory. This could take a while. Please be patient.')
    runSequence(
      'generate:png',
      done
    );
});

gulp.task('generate:png', tasks('png_generator'));

