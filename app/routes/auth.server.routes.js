'use strict';
var users = require('../controllers/users/user.authentication.server.controller');
var passport = require('passport');

module.exports = function (app) {
	
	app.route('/signup').post(users.signup);
	
	app.route('/signin')
	.post(passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true
	}));
}