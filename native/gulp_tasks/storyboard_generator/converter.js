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

if (args.length !== 3) {
	console.log("Usage: converter.js source dest scale");
	phantom.exit();
} else {
	convert(args[0], args[1], args[2]);
}

function convert(aspectFillTemplate, centerTemplate, destination) {
	var count = 0,
		page = webpage.create();

	page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90";
	
	count++;
	page.open(aspectFillTemplate, function (status) {
		if (status !== "success") {
			console.log("Unable to load the source file " + filePath);
			phantom.exit();
			return;
		}

		var configs = getAspectFillConfigurations();
		configs.forEach(function(config){
			page.viewportSize = {
				width: Math.round(config.width),
				height: Math.round(config.height)
			};
			page.zoomFactor = config.zoom;

			
			var path = destination + '/' + config.path;
			page.render(path);
		});
		count--;
	});

	var page2 = webpage.create();
	page2.settings.userAgent = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90";
	count++;
	page2.open(centerTemplate, function (status) {
		if (status !== "success") {
			console.log("Unable to load the source file " + filePath);
			phantom.exit();
			return;
		}

		var configs = getCenterImageConfigurations();
		configs.forEach(function(config){
			page2.viewportSize = {
				width: Math.round(config.width),
				height: Math.round(config.height)
			};
			page2.zoomFactor = config.zoom;

			
			var path = destination + '/' + config.path;
			page2.render(path);
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

function getAspectFillConfigurations(){
	return [
		{path: 'iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset/LaunchScreen-AspectFill.png', width: 768, height: 1024, zoom: 1},
		{path: 'iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset/LaunchScreen-AspectFill@2x.png', width: 1536, height: 2048, zoom: 2},
		{path: 'iOS/Assets.xcassets/LaunchScreen.AspectFill.imageset/LaunchScreen-AspectFill@3x.png', width: 2304, height: 3072, zoom: 3},
		{path: 'Android/drawable-ldpi/splash_screen_background.png', width: 288, height: 384, zoom: 0.75},
		{path: 'Android/drawable-mdpi/splash_screen_background.png', width: 384, height: 512, zoom: 1},
		{path: 'Android/drawable-hdpi/splash_screen_background.png', width: 576, height: 768, zoom: 1.5},
		{path: 'Android/drawable-xhdpi/splash_screen_background.png', width: 768, height: 1024, zoom: 2},
		{path: 'Android/drawable-xxhdpi/splash_screen_background.png', width: 1152, height: 1536, zoom: 3},
		{path: 'Android/drawable-xxxhdpi/splash_screen_background.png', width: 1536, height: 2048, zoom: 4},

	];
};
function getCenterImageConfigurations(){
	return [
		{path: 'iOS/Assets.xcassets/LaunchScreen.Center.imageset/LaunchScreen-Center.png', width: 384, height: 512, zoom: 1},
		{path: 'iOS/Assets.xcassets/LaunchScreen.Center.imageset/LaunchScreen-Center@2x.png', width: 768, height: 1024, zoom: 2},
		{path: 'iOS/Assets.xcassets/LaunchScreen.Center.imageset/LaunchScreen-Center@3x.png', width: 1152, height: 1536, zoom: 3},
		{path: 'Android/drawable-ldpi/splash_screen_logo.png', width: 144, height: 192, zoom: 0.35},
		{path: 'Android/drawable-mdpi/splash_screen_logo.png', width: 192, height: 256, zoom: 0.5},
		{path: 'Android/drawable-hdpi/splash_screen_logo.png', width: 288, height: 384, zoom: 0.75},
		{path: 'Android/drawable-xhdpi/splash_screen_logo.png', width: 384, height: 512, zoom: 1},
		{path: 'Android/drawable-xxhdpi/splash_screen_logo.png', width: 576, height: 768, zoom: 1.5},
		{path: 'Android/drawable-xxxhdpi/splash_screen_logo.png', width: 768, height: 1024, zoom: 2},
	];
};
