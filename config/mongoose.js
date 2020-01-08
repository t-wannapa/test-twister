'use strict';

var config = require('./config');
var mongoose = require('mongoose');
var path = require('path');

module.exports = function() {
	mongoose.set('debug', config.db.debug);

	var db = mongoose.connect(config.db.uri);
	console.log(config.files.server.models);
	config.files.server.models.forEach(function (modelPath) {
   		require(path.resolve(modelPath));
  	});

	return db;
};