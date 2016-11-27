var mongoose = require('mongoose');

PlayerSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Player', PlayerSchema);