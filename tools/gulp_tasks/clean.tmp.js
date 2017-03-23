"use strict";

var path = require('path');
var join = path.join;
var config = require('./config');
var del = require('del');

module.exports = function (gulp, plugins, options) {
    return function () {
        return  del.sync([config.paths.tmp], {force: true});
    };
};