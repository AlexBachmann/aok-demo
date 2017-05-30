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

gulp.task('generate:png', function(done){
    console.log('Generate png images for both platforms (android / ios) out of svg files in the resources/private/icons/svg directory. This could take a while. Please be patient.')
    tasks('png_generator')(done);
});

gulp.task('generate:launch.images', function(done){
	console.log('Generate launch images and App Icons. This can take a while. please be patient.');
	tasks('launch_image_generator')(function(errors){
		if(errors){
			done(errors); 
			return;
		}
		console.log('Generated Launch Images...');
		tasks('storyboard_generator')(function(errors){
			if(errors){
				done(errors); 
				return;
			}
			console.log('Generated Launch Story Boards ...');
			tasks('launch_icon_generator')(function(errors){
				if(errors){
					done(errors); 
					return;
				}
				console.log('Generated Launch Icons ...');
				done();
			});
		});
	});
});

