var fs = require('fs'),
	webpage = require("webpage"),
	system = require('system'),
	args = system.args;

args.shift();

if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1), 
		fToBind = this, 
		fNOP = function () {},
		fBound = function () {
			return fToBind.apply(this instanceof fNOP && oThis
				? this
				: oThis,
				aArgs.concat(Array.prototype.slice.call(arguments)));
		};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

if (args.length !== 2) {
	console.log("Usage: converter.js source dest scale");
	phantom.exit();
} else {
	convert(args[0], args[1]);
}

function convert(source, destination) {
	var scales = [0.75, 1, 1.5, 2, 3, 4],
		files = fs.list(source).filter(function(file){ return (file != '.' && file != '..')});
	
	var count = 0;

	files.forEach(function(file){
		var filePath = source + '/' + file,
			page = webpage.create();

		page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90";
		
		count++;
		page.open(filePath, function (status) {
			if (status !== "success") {
				console.log("Unable to load the source file " + filePath);
				phantom.exit();
				return;
			}

			var dimensions = getSvgDimensions(page);
			scales.forEach(function(scale){
				page.viewportSize = {
					width: Math.round(dimensions.width * scale),
					height: Math.round(dimensions.height * scale)
				};
				page.zoomFactor = scale;

				// This delay is I guess necessary for the resizing to happen?
				var ios_destination = getIosDestination(destination, scale, file);
				var android_destination = getAndroidDestination(destination, scale, file);

				if(ios_destination) page.render(ios_destination);
				if(android_destination) page.render(android_destination);
			});
			count--;
		});
	});
	function close(){
		if(count == 0){
			phantom.exit();
		}else{
			setTimeout(close, 0);
		}
	}
	close();
};

function getSvgDimensions(page) {
	return page.evaluate(function () {
		

		var el = document.documentElement;
		var bbox = el.getBBox();

		var width = parseFloat(el.getAttribute("width"));
		var height = parseFloat(el.getAttribute("height"));
		var viewBoxWidth = el.viewBox.animVal.width;
		var viewBoxHeight = el.viewBox.animVal.height;
		var usesViewBox = viewBoxWidth && viewBoxHeight;

		if (usesViewBox) {
			if (width && !height) {
				height = width * viewBoxHeight / viewBoxWidth;
			}
			if (height && !width) {
				width = height * viewBoxWidth / viewBoxHeight;
			}
			if (!width && !height) {
				width = viewBoxWidth;
				height = viewBoxHeight;
			}
		}

		if (!width) {
			width = bbox.width + bbox.x;
		}
		if (!height) {
			height = bbox.height + bbox.y;
		}

		return { width: width, height: height, usesViewBox: usesViewBox };
	});
}

function getIosDestination(destination, scale, file){
	switch(scale){
		case 1:
			return destination + '/iOS/' + file.replace('.svg', '') + '@1x.png';
		case 2:
			return destination + '/iOS/' + file.replace('.svg', '') + '@2x.png';
		case 3:
			return destination + '/iOS/' + file.replace('.svg', '') + '@3x.png';
		default:
			return null;
	}
}

function getAndroidDestination(destination, scale, file){
	switch(scale){
		case 0.75:
			return destination + '/Android/drawable-ldpi/' + file.replace('.svg', '') + '.png';
		case 1:
			return destination + '/Android/drawable-mdpi/' + file.replace('.svg', '') + '.png';
		case 1.5:
			return destination + '/Android/drawable-hdpi/' + file.replace('.svg', '') + '.png';
		case 2:
			return destination + '/Android/drawable-xhdpi/' + file.replace('.svg', '') + '.png';
		case 3:
			return destination + '/Android/drawable-xxhdpi/' + file.replace('.svg', '') + '.png';
		case 4:
			return destination + '/Android/drawable-xxxhdpi/' + file.replace('.svg', '') + '.png';
		default:
			return null;
			break;
	}
}
