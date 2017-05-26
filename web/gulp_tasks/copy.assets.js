"use strict";

var config = require('./config');
module.exports = function (gulp, plugins, options) {
    return function () {
        return 	gulp.src([config.paths.src + '/.htaccess', config.paths.src + '/app.php', config.paths.src + '/app_dev.php'])
        		.pipe(gulp.dest(config.paths.dist));
    };
};