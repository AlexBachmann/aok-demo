"use strict";

var config = require('./config');
var generator = require('./launch_image_generator/bin');

module.exports = function (gulp, plugins, options) {
  return function (cb) {
  	generator.generate(config, function (error) {
      if(cb){
        cb(error);
      }
    });
  };
};