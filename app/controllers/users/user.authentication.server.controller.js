'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function (req, res) {
	// For security measurement we remove the roles form the req.body object
	delete req.body.roles;

	// Init user and add missing fields
	var user = new User(req.body);
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

	// The save the user
	user.save(function (err) {
		if (err) {
			return res.status(422).send(err);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function (err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

/**
 * Signout
 */
exports.signout = function (req, res) {
	req.logout();
	res.redirect('/');
  };