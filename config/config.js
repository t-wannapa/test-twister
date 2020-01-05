
var _ = require('lodash');
var glob = require('glob');
var path = require('path');

/**
 * Get files by glob patterns
 */
var getGlobbedPaths = function (globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  var output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      var files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '');
              }
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
   
      output = _.union(output, files);
    }
  }

  return output;
};

var initGlobalConfigFiles = function(config, assets) {
	config.files = {
    client: {},
    server: {}
  };

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);
	
  // Setting Globbed css files
	config.files.client.css = getGlobbedPaths(assets.client.css, 'public/');
  
  // Setting Globbed js files
  config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, 'public/'));
};

var initGlobalConfig = function() {
	// Get the default assets
	var defaultAsset = require(path.join(process.cwd(), 'config/assets/default'));
	
	// Get the default config
	var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));
	
	// Get the current config
	var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

	// Merge config files
	var config = _.merge(defaultConfig, environmentConfig);

	initGlobalConfigFiles(config, defaultAsset);

	return config;
};

module.exports = initGlobalConfig();
