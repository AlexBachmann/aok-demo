"use strict";

var path = require('path');
var join = path.join;
var config = require('./config');
var del = require('del');

module.exports = function (gulp, plugins, options) {
    return function () {
        return  del.sync([join(config.paths.dist, '**/*'), '!' + config.paths.dist, '!' + join(config.paths.dist, '**/*.php'), '!' + join(config.paths.dist, 'robots.txt')], {force: true});
    };
};