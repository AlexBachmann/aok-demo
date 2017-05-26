//var config = require('../src/config');
var path = require('path');
var yargs = require('yargs');
var argv = yargs.argv;

var srcPath = 'src';

module.exports = {
	sprite : {
		iconsPathSvg: srcPath + '/assets/private/icons/svg',
		iconsPathPng: srcPath + '/assets/private/icons/png',
		out: srcPath + '/assets/public/sprite/generated',
		scssPath: '', // Relative path to the out path
		cssSpritePath: '/assets/public/sprite/generated', // Relative path from the compiled css file to the sprite file
		spritePath: 'sprite', // Relative path to the scss Path + the filename prefix
	},
	paths: {
		src: srcPath,
		dist: 'dist',
		tmp: 'tmp'
	}
}