module.exports = function (mongoose,  dbConn) {

	PlayerSchema = new mongoose.Schema({
		name: String,
		photo: { data: Buffer, contentType: String },
		active: Boolean
	});
	
	return dbConn.model('Player', PlayerSchema);
};