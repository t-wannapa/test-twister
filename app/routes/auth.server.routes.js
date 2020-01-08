'use strict';

var passport = require('passport');

module.exports = function (app) {
	var users = require('../controllers/users/user.authentication.server.controller');
	
	app.route('/signup').post(users.signup);
	
	app.route('/signin')
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));

	app.route('/signout').get(users.signout);
}