var passport = require('passport');
var Account = require('../models/account');

exports.getLogin = function(req, res){
	res.render('user/login', { user : req.user });
};

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