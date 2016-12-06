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

exports.findPlayer = function(req, res) {
	Player.findById(req.params._id, function(err, player) {
		if (err) {
			res.json(err);
        } else {
        	res.json(player);
        }
	});
};

exports.newPlayer = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	var id = req.params._id;
	if (!id) {
		id = 0; 	
	}
	
	res.render('player/new', { user : req.user, _id : id });
};

exports.postNewPlayer = function(req, res){
//	var player = new Player({name: req.body.name});
//	player.save(function(err, doc) {
//		if(err || !doc) {
//			res.json(err);
//		} else {
//			//res.json(doc);
//			res.json();
//		}
//	});
	
	Player.findById(req.body._id, function(err, player) {
		if (err) {
			res.json(err);
        } else {
        	if (!player) {
        		player = new Player();
        	}        	
			player.name = req.body.name;

			player.save(function(err, doc) {
				if(err || !doc) {
					res.json(err);
				} else {
					//res.json(doc);
					res.json();
				}
			});
        }
	});
};
