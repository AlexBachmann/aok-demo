var fs = require('fs'),
	path = require('path')
	phantomjs = require('phantomjs').path,
	execFile = require("child_process").execFile;
var exports = module.exports = {};


exports.generate = function (config, callback) {
	var template = config.launchImage.template,
		outDir = config.launchImage.out;

	var args = [
		path.join(__dirname, 'converter.js'),
		template,
		outDir
	];

	execFile(phantomjs, args, function (err, stdout, stderr) {
		if(stdout) console.log(stdout);
		callback();
	});
}