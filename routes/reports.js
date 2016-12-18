var mongoose = require('mongoose');
//var dbConn = mongoose.connection;
//var Sumula = require('../models/sumula')(mongoose,dbConn);
var Sumula = mongoose.model('Sumula');

exports.rPlayers = function(req, res) {
//	if (!req.user) {
//        res.render('user/login', { user : req.user });
//	} else {
		res.render('reports/player', { user : req.user });
//	}
};

exports.rPlayersList = function(req, res) {
	Sumula.aggregate(
			[
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
				},
				{
					$group : {
						_id: "$players.idPlayer",
						name: { $first: "$p.name"},
						gols: { $sum: "$players.gols" },
						jogos: { $sum: 1 },
						yellow: { $sum: { $cond: [ "$players.yellow", 1, 0 ] } },
						red: { $sum: { $cond: [ "$players.red", 1, 0 ] } }
					}
				},
				{
					$sort : { gols : -1 }
				}
			],
			function(err, rPlayersList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	for (i in rPlayersList) {
		        		rPlayersList[i].name = rPlayersList[i].name[0];
		        	}
		        	res.json(rPlayersList);
		        }
			}
	);
};