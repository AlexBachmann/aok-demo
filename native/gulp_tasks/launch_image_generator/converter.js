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

		var configs = getLaunchImageConfigurations();
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
	function close(){
		if(count == 0){
			phantom.exit();
		}else{
			setTimeout(close, 0);
		}
	}
	close();
};

function getLaunchImageConfigurations(){
	return [
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-568h@2x.png', width: 640, height: 1136, zoom: 1},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-667h@2x.png', width: 750, height: 1334, zoom: 1.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-736h@3x.png', width: 1242, height: 2208, zoom: 2.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-Landscape.png', width: 1024, height: 768, zoom: 1.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-Landscape@2x.png', width: 2048, height: 1536, zoom: 3},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-Landscape@3x.png', width: 2208, height: 1242, zoom: 3},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-Portrait.png', width: 768, height: 1024, zoom: 1.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default-Portrait@2x.png', width: 1536, height: 2048, zoom: 2.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default.png', width: 320, height: 480, zoom: 0.5},
		{path: 'iOS/Assets.xcassets/LaunchImage.launchimage/Default@2x.png', width: 640, height: 960, zoom: 1.25},
	];
}
