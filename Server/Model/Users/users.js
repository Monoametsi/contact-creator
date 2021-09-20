const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	
	_id: {
		type: String,
		required: true
	},
	Email: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	},
	Contacts: {
		type: Array,
		required: false
	}
	
});

const users = mongoose.model('users', userSchema);

module.exports = {
	users
}