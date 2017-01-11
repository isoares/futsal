var mongoose = require('mongoose');
//var dbConn = mongoose.connection;
//var Player = require('../models/player')(mongoose,dbConn);
var Player = mongoose.model('Player');

var fs = require('fs');

exports.players = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	} else {	
		res.render('player/list', { user : req.user });
	}
};

var playersList = function(req, res) {
	Player.find({}).select('-photo').exec(function(err, playersList) {
		if (err) {
			res.json(err);
        }
        else {
        	res.json(playersList);
        }
	});
};

exports.playersList = playersList;

exports.playersListActive = function(req, res) {
	Player.find({active: true}).select('-photo').exec(function(err, playersList) {
		if (err) {
			res.json(err);
        }
        else {
        	res.json(playersList);
        }
	});
}; 

exports.getPlayerPhotoDefault = function(req, res){
	res.writeHead(200, {'Content-Type': 'image/png'});
	res.end(fs.readFileSync('./public/images/photo.png'));
};

exports.getPlayerPhoto = function(req, res){
	Player.findById(req.params.id).select('photo').exec(function(err, player) {
		if (err) {
//			res.writeHead(200, {'Content-Type': 'image/png'});
//	    		res.end(fs.readFileSync('./public/images/photo.png'));
			res.end();
        } else {
        	if (player) {
        		res.writeHead(200, {'Content-Type': player.photo.contentType});
            	res.end(player.photo.data);
        	} else {
        		res.writeHead(200, {'Content-Type': 'image/png'});
        		res.end(fs.readFileSync('./public/images/photo.png'));
        	}
        }
	});
}

exports.findPlayer = function(req, res) {
	Player.findById(req.params._id).select('-photo').exec(function(err, player) {
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
	} else {	
		var id = req.params._id;
		if (!id) {
			id = 0; 	
		}
		
		res.render('player/new', { user : req.user, _id : id });
	}
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
        		
        		player.active = true;
        		
        		if (!req.file) {
        			player.photo.data = fs.readFileSync('./public/images/photo.png');
        			player.photo.contentType = 'image/png';
        		}
        	}
        	
			player.name = req.body.name;
			
			if (req.file) {
				player.photo.data = req.file.buffer;
				player.photo.contentType = req.file.mimetype;
			}

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

exports.inactivePlayer = function(req, res) {	
	Player.findOneAndUpdate({_id: req.params._id}, {$set: { active:false } }, function(err) {
		if (err) {
			res.json(err);
        } else {
        	playersList(req, res);
        }
	});
};

exports.activePlayer = function(req, res) {	
	Player.findOneAndUpdate({_id: req.params._id}, {$set: { active:true } }, function(err) {
		if (err) {
			res.json(err);
        } else {
        	playersList(req, res);
        }
	});
};

exports.deletePlayer = function(req, res) {	
	Player.findByIdAndRemove(req.params._id, function(err) {
		if (err) {
			res.json(err);
        } else {
        	playersList(req, res);
        }
	});
};