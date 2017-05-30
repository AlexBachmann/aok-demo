var fs = require('fs'),
	path = require('path')
	phantomjs = require('phantomjs').path,
	execFile = require("child_process").execFile;
var exports = module.exports = {};


exports.generate = function (config, callback) {
	var icon = config.app_icon.svg,
		outDir = config.app_icon.out;

	var args = [
		path.join(__dirname, 'converter.js'),
		icon,
		outDir
	];

	execFile(phantomjs, args, function (err, stdout, stderr) {
		if(stdout) console.log(stdout);
		callback();
	});
}