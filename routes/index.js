var mongoose = require('mongoose');
//var dbConn = mongoose.connection;
//var Sumula = require('../models/sumula')(mongoose,dbConn);
var Sumula = mongoose.model('Sumula');

exports.index = function(req, res){
	res.render('index', { user : req.user });
};

exports.rSumulas = function(req, res){
	res.render('reports/team', { user : req.user });
};

exports.rSumulasListTotal = function(req, res) {	
	Sumula.aggregate(
			[
				{
					$group : {
						_id: "Total",
						games: { $sum: 1 },
						goalsPro: { $sum: "$goalsPro" },
						goalsCon: { $sum: "$goalsCon" },
						goalsDif: { $sum: { $subtract: ["$goalsPro", "$goalsCon"] } },
						wins: { $sum: { $cond: [ { $gt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						draws: { $sum: { $cond: [ { $eq: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						losses: { $sum: { $cond: [ { $lt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } }
					}
				}
			],
			function(err, rSumulaList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	res.json(rSumulaList);
		        }
			}
	);
};

exports.rSumulasListTeam = function(req, res) {	
	Sumula.aggregate(
			[
				{
					$group : {
						_id: "$quadro",
						games: { $sum: 1 },
						goalsPro: { $sum: "$goalsPro" },
						goalsCon: { $sum: "$goalsCon" },
						goalsDif: { $sum: { $subtract: ["$goalsPro", "$goalsCon"] } },
						wins: { $sum: { $cond: [ { $gt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						draws: { $sum: { $cond: [ { $eq: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						losses: { $sum: { $cond: [ { $lt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } }
					}
				}
			],
			function(err, rSumulaList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	res.json(rSumulaList);
		        }
			}
	);
};

exports.rSumulasListComp = function(req, res) {	
	Sumula.aggregate(
			[
				{
					$group : { _id: "$competicao" }
				},
				{
					$sort : { _id : 1 }
				}
			],
			function(err, rSumulaList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	res.json(rSumulaList);
		        }
			}
	);
};

exports.rSumulasListCompTeam = function(req, res) {	
	Sumula.aggregate(
			[
				{
					$group : {
						_id: { competicao: "$competicao", quadro: "$quadro"},
						games: { $sum: 1 },
						goalsPro: { $sum: "$goalsPro" },
						goalsCon: { $sum: "$goalsCon" },
						goalsDif: { $sum: { $subtract: ["$goalsPro", "$goalsCon"] } },
						wins: { $sum: { $cond: [ { $gt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						draws: { $sum: { $cond: [ { $eq: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						losses: { $sum: { $cond: [ { $lt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } }
					}
				}
			],
			function(err, rSumulaList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	res.json(rSumulaList);
		        }
			}
	);
};

exports.rSumulasListCompTotal = function(req, res) {	
	Sumula.aggregate(
			[
				{
					$group : {
						_id: { competicao: "$competicao", quadro: "Total"},
						games: { $sum: 1 },
						goalsPro: { $sum: "$goalsPro" },
						goalsCon: { $sum: "$goalsCon" },
						goalsDif: { $sum: { $subtract: ["$goalsPro", "$goalsCon"] } },
						wins: { $sum: { $cond: [ { $gt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						draws: { $sum: { $cond: [ { $eq: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } },
						losses: { $sum: { $cond: [ { $lt: ["$goalsPro", "$goalsCon"] }, 1, 0 ] } }
					}
				}
			],
			function(err, rSumulaList) {
				if (err) {
					res.json(err);
		        }
		        else {
		        	res.json(rSumulaList);
		        }
			}
	);
};