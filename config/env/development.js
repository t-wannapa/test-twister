'use strict';

var defaultConfig = require('./default');

module.exports = {
	app: {
		title: defaultConfig.app.title + ' - Development Environment'
	},
	db: {
    	uri: 'mongodb://' + 'localhost' + '/mean-dev',
    	// Enable mongoose debug mode
    	debug: process.env.MONGODB_DEBUG || false
  	}
};