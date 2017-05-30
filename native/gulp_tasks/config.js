//var config = require('../src/config');
var path = require('path');
var srcPath = 'app';

module.exports = {
	svg : {
		iconsPathSvg: 'resources/private/icons/svg',
		out: srcPath + '/App_Resources'
	},
	launchImage: {
		template: 'resources/private/launch_image/template.html',
		out: srcPath + '/App_Resources'
	},
	app_icon: {
		svg: 'resources/private/app_icon/icon.svg',
		out: srcPath + '/App_Resources'
	},
	storyBoard: {
		aspectFillTemplate: 'resources/private/launch_image/template_background_only.html',
		centerTemplate: 'resources/private/launch_image/template_icon_only.html',
		out: srcPath + '/App_Resources'
	}
}