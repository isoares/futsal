var Sumula = require('../models/sumula');

exports.sumulas = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('sumula/list', { user : req.user });
};

exports.sumulasList = function(req, res) {
	Sumula.find({}, function(err, sumulasList) {
		if (err) {
			res.json(err);
        }
        else {
        	res.json(sumulasList);
        }
	});
};

exports.newSumula = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('sumula/new', { user : req.user });
};

exports.postNewSumula = function(req, res) {
	var players = [];
	req.body.players.forEach(function(item) {
		if (item.active) {
			var itemPlayer = {idPlayer: item._id, gols: item.gols, yellow: item.yellow, red: item.red};
			players.push(itemPlayer);
		}
	});
	console.log("3");
	
	var sumulaObj = {data: req.body.data, quadro: req.body.quadro, adversario: req.body.adversario, golsFavor: req.body.golsFavor, golsContra: req.body.golsContra, players: players};
	var sumula = new Sumula(sumulaObj);
	sumula.save(function(err, doc) {
		if(err || !doc) {
			res.json(err);
		} else {
			//res.json(doc);
			res.json();
		}
	});
};