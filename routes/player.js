var Player = require('../models/player');

exports.players = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('player/list', { user : req.user });
};

exports.playersList = function(req, res) {
	Player.find({}, function(err, playersList) {
		if (err) {
			res.json(err);
        }
        else {
        	res.json(playersList);
        }
	});
};

exports.newPlayer = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('player/new', { user : req.user });
};

exports.postNewPlayer = function(req, res){
	var player = new Player({name: req.body.name});
	player.save(function(err, doc) {
		if(err || !doc) {
			res.json(err);
		} else {
			//res.json(doc);
			res.json();
		}
	});
};