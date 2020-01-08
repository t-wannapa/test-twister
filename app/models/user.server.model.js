'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

/**
 * User Schema
 */
 var UserSchema = new Schema({
 	firstName: {
 		type: String,
 		trim: true,
 		default: ''
 	},
 	lastName: {
 		type: String,
 		trim: true,
 		default: ''
 	},
 	email: {
 		type: String,
 		index: {
 			unique: true
 		},
 		lowercase: true,
 		trim: true,
 		default: ''
 	},
 	username: {
    	type: String,
    	unique: 'Username already exists',
    	required: 'Please fill in a username',
    	lowercase: true,
    	trim: true
  	},
  	password: {
    	type: String,
    	default: ''
  	},
  	salt: {
    	type: String
 	},
	provider: {
		type: String,
	    required: 'Provider is required'
	},
	providerData: {},
	roles: {
    	type: [{
      		type: String,
      		enum: ['user', 'admin']
    	}],
    	default: ['user'],
    	required: 'Please provide at least one role'
  	},
	created: {
    	type: Date,
    	default: Date.now
  	},
 });

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password) {
    this.salt = new Buffer.alloc(16, crypto.randomBytes(16).toString('base64'));
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    // return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username.toLowerCase() + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function (err, user) {
		if (!err) {
			if (!user) callback(possibleUsername);
			else return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
		} else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);