var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/sumula');

var connection_string = '127.0.0.1:27017/sumula';

//if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	process.env.OPENSHIFT_APP_NAME;
}

//var dbConn = mongoose.createConnection('mongodb://' + connection_string);
mongoose.connect('mongodb://' + connection_string);

var dbConn = mongoose.connection;

var Player = require('../models/player')(mongoose,dbConn);
var Sumula = require('../models/sumula')(mongoose,dbConn);
var Account = require('../models/account')(mongoose,dbConn);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
