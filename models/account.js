module.exports = function (mongoose,  dbConn) {

	var Schema = mongoose.Schema;
	var passportLocalMongoose = require('passport-local-mongoose');

	var Account = new Schema({
		name: String,
	    username: String,
	    password: String,
		status: Number
	});

	Account.plugin(passportLocalMongoose);
	
	return dbConn.model('Account', Account);
};