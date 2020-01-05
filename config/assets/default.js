'use strict';

module.exports = {
	client: {
		lib: {
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/modules/config.js',
			'public/modules/init.js',
			'public/modules/*/*.js',
			'public/modules/**/*.js',
			'public/modules/**/js/*.js'
		]
	},
	server: {
		routes: ['app/routes/*.js']
	}
}