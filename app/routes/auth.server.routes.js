'use strict';
var users = require('../controllers/users/user.authentication.server.controller');
var passport = require('passport');

module.exports = function (app) {
	
	app.route('/signup').post(users.signup);

	app.route('/login')
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));
}