var mongoose = require('mongoose');
//var dbConn = mongoose.connection;
//var Sumula = require('../models/sumula')(mongoose,dbConn);
var Sumula = mongoose.model('Sumula');

exports.sumulas = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	} else {
		res.render('sumula/list', { user : req.user });
	}
};

var sumulasList = function(req, res) {
	Sumula.find({}, function(err, sumulasList) {
		if (err) {
			res.json(err);
        }
        else {
        	res.json(sumulasList);
        }
	});
};

exports.sumulasList = sumulasList; 

exports.findSumula = function(req, res) {
//	Sumula.findById(req.params._id, function(err, sumula) {
//		if (err) {
//			res.json(err);
//        } else {
//        	res.json(sumula);
//        }
//	});
	var ObjectID = require("mongodb").ObjectID;
	var o_id = new ObjectID(req.params._id);
	Sumula.aggregate(
			[
				{
					$match: {_id: o_id} 
				},
				{
					$unwind : "$players"
				},
				{
					$lookup: {
						from: "players",
						localField: "players.idPlayer",
						foreignField: "_id",
						as: "p"
					}
				}
			],
			function(err, sumula) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	var data = sumula[0];
		        	data.players.name = data.p[0].name;
		        	data.players = [data.players];		        	
		        	
		        	for (i = 1; i < sumula.length; i++) {
		        		sumula[i].players.name = sumula[i].p[0].name;
		        		data.players.push(sumula[i].players);
		        	}
		        	
		        	res.json(data);
		        }
			}
		);
	
};

exports.newSumula = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	} else {
		var id = req.params._id;
		if (!id) {
			id = 0; 	
		}
		
		res.render('sumula/new', { user : req.user, _id : id });
	}
};

exports.postNewSumula = function(req, res) {
	var players = [];
	req.body.players.forEach(function(item) {
		if (item.active) {
			var itemPlayer = {idPlayer: item._id, gols: item.gols, yellow: item.yellow, red: item.red};
			players.push(itemPlayer);
		}
	});
	
	var sumulaObj = {data: req.body.data, quadro: req.body.quadro, adversario: req.body.adversario, goalsPro: req.body.goalsPro, goalsCon: req.body.goalsCon, players: players};
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

exports.deleteSumula = function(req, res) {	
	Sumula.findByIdAndRemove(req.params._id, function(err) {
		if (err) {
			res.json(err);
        } else {
        	sumulasList(req, res);
        }
	});
};