var mongoose = require('mongoose');

// Favorite Schema
var FavoriteSchema = mongoose.Schema({
	id: {
		type: String
	},
	title: {
		type: String
	}
},{ _id : false });

// User Schema
var UserSchema = mongoose.Schema({
	_id: {
		
	},
	internal: {
		type: Boolean,
	},
	level: {
		type: Number,
	},
	permissions: {
		LC: {
			type: Boolean,
		},
		AE: {
			type: Boolean,
		},
		ES: {
			type: Boolean,
		},
	},
	email: {
		type: String,
		index: true
	},
	name: {
		type: String
	},
	nCalls: {
		type: Number,
		default: 0
    },
	local: {
		password: {
			type: String
		}
	},
	favorites: {
		type: [FavoriteSchema]
	}
});

module.exports = mongoose.model('User', UserSchema, 'users');
