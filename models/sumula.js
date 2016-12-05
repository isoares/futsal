var mongoose = require('mongoose');

var sumulaPlayers = new mongoose.Schema({
	idPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'player' },
	gols: Number,
	yellow: Boolean,
	red: Boolean
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