var passport = require('passport');
var Account = require('../models/account');

/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('index', { user : req.user });
};

exports.getLogin = function(req, res){
	res.render('login', { user : req.user });
};

exports.postLogin = passport.authenticate('local', { 
	successRedirect: '/',
	failureRedirect: '/login' });


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
        res.render('login', { user : req.user });
	}
	
	res.render('users', { user : req.user });
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
        res.render('login', { user : req.user });
	}
	
	res.render('register', { user : req.user });
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