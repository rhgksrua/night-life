'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
	    publicRepos: Number,
	    created: { type: Date, default: Date.now }
	}
});

module.exports = mongoose.model('User', User);