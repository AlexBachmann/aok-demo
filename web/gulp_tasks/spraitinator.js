"use strict";

var config = require('./config');
var spraitinator = require('./spraitinator/lib/bin');
var del = require('del');

module.exports = function (gulp, plugins, options) {
  return function (cb) {
    del.sync(config.sprite.out);
  	spraitinator.generate({
      iconsPathSvg: config.sprite.iconsPathSvg,
      out: config.sprite.out,
      scssPath: config.sprite.scssPath,
      cssSpritePath: config.sprite.cssSpritePath,
      spritePath: config.sprite.spritePath
    }, function (error) {
      if(cb){
        cb(error);
      }
    });
  };
};