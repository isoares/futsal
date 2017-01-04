module.exports = function (mongoose,  dbConn) {

	var sumulaPlayers = new mongoose.Schema({
		idPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
		gols: Number,
		yellow: Boolean,
		red: Boolean
	});

	SumulaSchema = new mongoose.Schema({
		data: Date,
		competicao: String,
		quadro: Number,
		adversario: String,
		goalsPro: Number,
		goalsCon: Number,
		players: [sumulaPlayers]
	});
	
	return dbConn.model('Sumula', SumulaSchema);
};