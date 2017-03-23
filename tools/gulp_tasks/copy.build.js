"use strict";

var config = require('./config');
module.exports = function (gulp, plugins, options) {
    return function () {
        return 	gulp.src([config.paths.tmp + '/**/*'])
        		.pipe(gulp.dest(config.paths.dist));
    };
};