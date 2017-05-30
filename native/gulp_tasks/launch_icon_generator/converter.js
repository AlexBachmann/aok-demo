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

function convert(template, destination) {
	var count = 0,
		page = webpage.create();

	page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90";
	
	count++;
	page.open(template, function (status) {
		if (status !== "success") {
			console.log("Unable to load the source file " + filePath);
			phantom.exit();
			return;
		}

		var dimensions = getSvgDimensions(page),
			configs = getLaunchImageConfigurations();
		configs.forEach(function(config){
			page.viewportSize = {
				width: config.width,
				height: config.height
			};
			page.zoomFactor = (config.width / dimensions.width);

			
			var path = destination + '/' + config.path;
			page.render(path);
		});
		count--;
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
};

function getLaunchImageConfigurations(){
	return [
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-29.png', width: 29, height: 29},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-29@2x.png', width: 58, height: 58},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-29@3x.png', width: 87, height: 87},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-40.png', width: 40, height: 40},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-40@2x.png', width: 80, height: 80},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-40@3x.png', width: 120, height: 120},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-50.png', width: 50, height: 50},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-50@2x.png', width: 100, height: 100},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-57.png', width: 57, height: 57},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-57@2x.png', width: 114, height: 114},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-60.png', width: 60, height: 60},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-60@2x.png', width: 120, height: 120},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-60@3x.png', width: 180, height: 180},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-72.png', width: 72, height: 72},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-72@2x.png', width: 144, height: 144},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-76.png', width: 76, height: 76},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-76@2x.png', width: 152, height: 152},
		{path: 'iOS/Assets.xcassets/AppIcon.appiconset/icon-83.5@2x.png', width: 167, height: 167},
		{path: 'Android/drawable-ldpi/icon.png', width: 36, height: 36},
		{path: 'Android/drawable-mdpi/icon.png', width: 48, height: 48},
		{path: 'Android/drawable-hdpi/icon.png', width: 72, height: 72},
		{path: 'Android/drawable-xhdpi/icon.png', width: 96, height: 96},
		{path: 'Android/drawable-xxhdpi/icon.png', width: 144, height: 144},
		{path: 'Android/drawable-xxxhdpi/icon.png', width: 345, height: 345},
	];
};
