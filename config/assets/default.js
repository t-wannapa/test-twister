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
			'public/modules/**/js/*.js',
			'public/modules/core/core.client.module.js',
			'public/modules/application.js'
		]
	},
	server: {
		routes: ['app/routes/*.js']
	}
}