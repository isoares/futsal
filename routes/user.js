var mongoose = require('mongoose');
//var dbConn = mongoose.connection;
//var Account = require('../models/account')(mongoose,dbConn);
var Account = mongoose.model('Account');
var passport = require('passport');

exports.getLogin = function(req, res){
	res.render('user/login', { user : req.user });
};

var postLogin = function(req, res){
    passport.authenticate('local')(req, res, function () {
    	if (req.user.status == 0) {
    		req.logout();
    		res.json('newPasswordRequired');
    	} else {
    		res.json();
    	}
    });
};

exports.postLogin = postLogin; 

exports.logout = function(req, res){
	req.logout();
    res.redirect('/');
};

exports.users = function(req, res) {
	if (!req.user) {
        res.render('user/login', { user : req.user });
	} else {	
		res.render('user/users', { user : req.user });
	}
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

exports.getFirstUser = function(req, res){
	Account.find({}).limit(1).exec(function(err, accountList) {
		if (err) {
			res.json(err);
        }
        else {
        	if (accountList.length == 0) {
        		res.render('user/register', { user : req.user, firstUser : true });
        	} else {
        		res.render('user/login', { user : req.user });
        	}
        }
	});
};

exports.getRegister = function(req, res){
	if (!req.user) {
        res.render('user/login', { user : req.user });
	} else {	
		res.render('user/register', { user : req.user });
	}
};

exports.postRegister = function(req, res){
    Account.register(new Account({ name : req.body.name, username : req.body.username, status : req.body.status, admin : req.body.admin }), req.body.password, function(err, account) {
        if (err) {
        	res.json(err);
        } else {
        	res.json();
        }
    });
};

exports.postChangePassword = function(req, res){
	Account.findByUsername(req.body.username, function(err, account) {
		if (err) {
			res.json(err);
        }
        else {
        	if (account) {
        		account.status = 1;
        		account.setPassword(req.body.newPassword, function(err) {
        			if (err) {
        				res.json(err);
        			} else {
        				account.save(function(err) {
        					if(err) {
        						res.json(err);
        					} else {
        						req.body.password = req.body.newPassword;        				
                				postLogin(req, res);
        					}
        				});
        			}
        		})
        	} else {
        		res.json('Error');
        	}
        }
	});
};

//userModel.findByUsername(email).then(function(sanitizedUser){
//    if (sanitizedUser){
//        sanitizedUser.setPassword(newPasswordString, function(){
//            sanitizedUser.save();
//            res.status(200).json({message: 'password reset successful'});
//        });
//    } else {
//        res.status(500).json({message: 'This user does not exist'});
//    }
//},function(err){
//    console.error(err);
//})