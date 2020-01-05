'use strict';

var express = require('express');
var _ = require('lodash');
var path = require('path')

var consolidate = require('consolidate');

/**
 * Configure the modules server routes
 */
var initModulesServerRoutes = function(app, routes) {
  routes.forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });
};

module.exports  = function() {;
  // Initialize express app
  var app = express();

  var config = require('./config');
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;


  // Set jade as the template engine
  app.engine('server.view.jade', consolidate[config.templateEngine]);

  // Set views path and view engine
  app.set('views', ['./app/views', './public']);
  app.set('view engine', 'server.view.jade');

 // require('../app/routes/index.server.routes')(app);
  // Initialize modules server routes
  initModulesServerRoutes(app, config.files.server.routes);

  app.use(express.static('./public'));
  return app;
}

