module.exports = function (mongoose,  dbConn) {

	PlayerSchema = new mongoose.Schema({
		name: String
	});
	
	return dbConn.model('Player', PlayerSchema);
};