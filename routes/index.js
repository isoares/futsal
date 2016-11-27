var passport = require('passport');
var Account = require('../models/account');
var Player = require('../models/player');

/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { user : req.user });
};

exports.getLogin = function(req, res){
	res.render('user/login', { user : req.user });
};

//exports.postLogin = passport.authenticate('local', { 
//	successRedirect: '/',
//	failureRedirect: '/login' });


exports.postLogin = function(req, res){
    passport.authenticate('local')(req, res, function () {
        	res.json();
    });
};

exports.logout = function(req, res){
	req.logout();
    res.redirect('/');
};

exports.users = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('user/users', { user : req.user });
};

exports.usersList = function(req, res) {
	Account.find({}, function(err, accountList) {
		if (err) {
			res.json(err);
        }
        else {
            res.json(accountList);
        }
	});
};

exports.getRegister = function(req, res){
	if (!req.user) {
        res.render('user/login', { user : req.user });
	}
	
	res.render('user/register', { user : req.user });
};

exports.postRegister = function(req, res){
    Account.register(new Account({ name : req.body.name, username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
        	res.json(err);
        } else {
        	res.json();
        }
    });
};

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