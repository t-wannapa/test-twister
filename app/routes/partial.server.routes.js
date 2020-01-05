'use strict';

var path = require('path');

module.exports = function(app) {
	var partial = require(path.join(process.cwd(), 'app/controllers/partial.server.controller'));
	app.get('/modules/:module/views/:view*', partial.render);
}