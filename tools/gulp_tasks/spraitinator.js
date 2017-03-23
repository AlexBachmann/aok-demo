"use strict";

var config = require('./config');
var spraitinator = require('./spraitinator/lib/bin');
var del = require('del');

module.exports = function (gulp, plugins, options) {
  return function (cb) {
    del.sync(config.sprite.out);
  	spraitinator.generate({
      iconsPathSvg: config.sprite.iconsPathSvg,
      iconsPathPng: config.sprite.iconsPathPng,
      out: config.sprite.out,
      scssPath: config.sprite.scssPath,
      cssSpritePath: config.sprite.cssSpritePath,
      spritePath: config.sprite.spritePath,
      scales: [1, 2]
    }, function (error) {
      if(cb){
        cb(error);
      }
    });
  };
};