module.exports = function (mongoose,  dbConn) {

	var Schema = mongoose.Schema;
	var passportLocalMongoose = require('passport-local-mongoose');

	var Account = new Schema({
		name: String,
	    username: String,
	    password: String,
	    admin: Boolean,
		status: Number //0-New 1-Active 2-Inactive
	});

	Account.plugin(passportLocalMongoose);
	
	return dbConn.model('Account', Account);
};