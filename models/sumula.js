var mongoose = require('mongoose');

var sumulaPlayers = new mongoose.Schema({
	idAtleta: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
	gols: Number
});

SumulaSchema = new mongoose.Schema({
	data: Date,
	quadro: Number,
	adversario: String,
	goalsPro: Number,
	goalsCon: Number,
	players: [sumulaPlayers]
});

module.exports = mongoose.model('Sumula', SumulaSchema);