'use strict';

var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var _ = require('lodash');
var path = require('path');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('connect-flash');
var passport = require("passport");
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
  if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
  }
  
  // Setting application local variables
  app.locals.jsFiles = config.files.client.js;
  app.locals.cssFiles = config.files.client.css;

	app.use(session({
		secret: 'secret_key',
		resave: false,
		saveUninitialized: true
	}));

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // Set jade as the template engine
  app.engine('server.view.jade', consolidate[config.templateEngine]);

  // Set views path and view engine
  app.set('views', ['./app/views', './public']);
  app.set('view engine', 'server.view.jade');

  // Initialize modules server routes
  initModulesServerRoutes(app, config.files.server.routes);

  app.use(express.static('./public'));
  return app;
}

