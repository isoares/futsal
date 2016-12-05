var Sumula = require('../models/sumula');

exports.rPlayers = function(req, res) {
//	if (!req.user) {
//        res.render('user/login', { user : req.user });
//	}
	
	res.render('reports/player', { user : req.user });
};

exports.rPlayersList = function(req, res) {
	Sumula.aggregate(
			[
				{
					$unwind : "$players"
				},
				{
					$group : {
						_id: "$players.idPlayer",
						gols: { $sum: "$players.gols" },
						jogos: { $sum: 1 },
						yellow: { $sum: { $cond: [ "$players.yellow", 1, 0 ] } },
						red: { $sum: { $cond: [ "$players.red", 1, 0 ] } }
					}
				},
				{
					$lookup: {
						from: "players",
						localField: "_id",
						foreignField: "_id",
						as: "p"
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
		        	res.json(rPlayersList);
		        }
			}
	);
};