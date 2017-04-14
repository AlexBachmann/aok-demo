var SVGSprite = require('svg-sprite');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var phantomjs = require('phantomjs').path;
var execFile = require("child_process").execFile;
var async = require('async');
var sizeOf = require('image-size');
var datauri = require('datauri');

var exports = module.exports = {};

exports.svgToPng = function (svg, scale, callback) {
	var args = [
		path.join(path.dirname(__dirname), 'lib', 'converter.js'),
		svg,
		svg.replace('.svg', 'x' + scale + '.png'),
		scale
	];

	execFile(phantomjs, args, function (err, stdout, stderr) {
		console.log(args[2] + ' created');
		console.log(stdout);
		callback();
	});
}

var split =	function (uristring) {
	var parts = uristring.split(',');
	var content = parts[1];
	var splitcontent = content.replace(/(.{76})/g, "$1\n");
	return parts[0] + ',\n' + splitcontent;
}

exports.pngToSvg = function (options, pngName, callback) {
	var templatePathSvg = path.join(path.dirname(__dirname), 'templates', 'png2svg.svg');

	fs.readFile(templatePathSvg, 'utf8', function (err, svgtemplate) {
		if (err) {
			callback(err);
		}

		var dimensions = sizeOf(options.iconsPathPng + '/' + pngName);
		
		var data = new datauri(options.iconsPathPng + '/' + pngName);
		var content = split(data.content);

		svgtemplate = svgtemplate.split('{{content}}').join(content);
		svgtemplate = svgtemplate.split('{{dimX}}').join(dimensions.width);
		svgtemplate = svgtemplate.split('{{dimY}}').join(dimensions.height);

		fs.writeFile(options.iconsPathPng + '/tmp/' + pngName.replace('.png','.svg'), svgtemplate, function (err) {
			callback(err);
		});
	}); 
}

exports.generate = function (options, callback) {
	options.mixintemplate = 'mixin.scss';
	options.icontemplate = 'icon.scss';
	options.iconfile = 'icon.scss';
	options.mixinfile = 'mixin.scss';
	exports.generateSVGSprite(options, function (error) {
		if (error) {
			callback(error);
		}
		exports.createPngSprite(options, function(error){
			if (error) {
				callback(error);
			}

			exports.generateSVGSprite(options, function (error) {
				callback(error);
			});
		});
	});
}

exports.generateSVGSprite = function (options, callback) {
	var templatePathMixin = path.join(path.dirname(__dirname), 'templates', options.mixintemplate);
	var templatePathIcon = path.join(path.dirname(__dirname), 'templates', options.icontemplate);

	if(options.templatePathMixin) {
		templatePathMixin = options.templatePathMixin;
	}

	if(options.templatePathIcon) {
		templatePathIcon = options.templatePathIcon;
	}

	var spriter = new SVGSprite({
		dest: options.out,
		mode: {
			css: {
				dest: options.scssPath,
				sprite: options.spritePath,
				render: {
					scss: {
						template: templatePathIcon,
						dest: options.iconfile,
						scss: true
					}
				}
			}
		},
		shape: {
			spacing: {
				padding: 0
			}
		}
	});

	var files = fs.readdirSync(options.iconsPathSvg);
	files.forEach(function (svg, index) {
		var svgPath = options.iconsPathSvg + '/' + svg;
		if (svg.indexOf('.svg') !== -1) {
			spriter.add(
				path.resolve(svgPath),
				svg,
				fs.readFileSync(svgPath, {encoding: 'utf-8'})
			);
		}
	});

	spriter.compile(function(error, result, data) {
		var sprites = [];
		for (var type in result.css) {

			mkdirp.sync(path.dirname(result.css[type].path));
			fs.writeFileSync(result.css[type].path, result.css[type].contents);
			
			if (type === 'sprite') {
				console.log(result.css[type].path + ' created');
				sprites.push(result.css[type].path);
			}
		}

		var tasks = [];
		sprites.forEach(function (sprite) {
			options.scales.forEach(function (scale) {
				tasks.push(function (_callback) {
					exports.svgToPng(sprite, scale, function () {
						_callback();
					});
				});
			});
		});

		async.series(tasks, function (error) {
			fs.readFile(templatePathMixin, 'utf8', function (err, mixin) {
				if (err) {
					callback(err);
				}

				var spriteSVGPath = sprites[0];
				var spritesSVGPathSplit = spriteSVGPath.split('/');

				var spriteSVG = options.cssSpritePath + '/' + spritesSVGPathSplit[spritesSVGPathSplit.length - 1];

				var dimensions = sizeOf(spriteSVGPath);

				mixin = mixin.split('{{svgSprite}}').join(spriteSVG);
				mixin = mixin.split('{{dimX}}').join(dimensions.width);
				mixin = mixin.split('{{dimY}}').join(dimensions.height);

				options.scales.forEach(function (scale) {
					mixin = mixin.split('{{pngSpriteX' + scale + '}}').join(spriteSVG.replace('.svg', 'x' + scale + '.png'));
				});


				fs.writeFile(options.out + '/' + options.scssPath + '/' + options.mixinfile, mixin, function (err) {
					console.log(options.out + '/' + options.scssPath + '/' + options.mixinfile + ' created');
					callback(err);
				});
			}); 
		});
	});
};

exports.createPngSprite = function(options, callback) {
	var files = fs.readdirSync(options.iconsPathPng);
	var tasks = [];

	options.iconsPathSvg = options.iconsPathPng + '/tmp';
	options.scales = [1];
	options.mixintemplate = 'mixinpng.scss';
	options.icontemplate = 'iconpng.scss';
	options.mixinfile = 'mixinpng.scss';
	options.iconfile = 'iconpng.scss';

	files.forEach(function (png, index) {
		if (png.indexOf('.png') !== -1) {
			tasks.push(function (_callback) {
				exports.pngToSvg(options, png, _callback);
			});
		}
	});

	async.series(tasks, function (error) {
		callback();
	});
}
