var fs = require('fs'),
	path = require('path')
	phantomjs = require('phantomjs').path,
	execFile = require("child_process").execFile;
var exports = module.exports = {};


exports.generate = function (config, callback) {
	var sourceDir = config.svg.iconsPathSvg,
		outDir = config.svg.out;

	var args = [
		path.join(__dirname, 'converter.js'),
		sourceDir,
		outDir
	];

	execFile(phantomjs, args, function (err, stdout, stderr) {
		console.log(stdout);
		callback();
	});
}