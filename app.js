
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , db = require('./routes/_db')
  , user = require('./routes/user')
  , playerRoute = require('./routes/player')
  , sumula = require('./routes/sumula')
  , reports = require('./routes/reports')
  , http = require('http')
  , path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var mongoose = require('mongoose');
//var LocalStrategy = require('passport-local').Strategy;

var app = express();
var server = http.createServer(app);

app.locals.appTitle = "Futsal";

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//// mongoose
////mongoose.connect('mongodb://localhost/sumula');
//
//var connection_string = '127.0.0.1:27017/sumula';
//
////if OPENSHIFT env variables are present, use the available connection info:
//if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
//	connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
//	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
//	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
//	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
//	process.env.OPENSHIFT_APP_NAME;
//}
//
////var dbConn = mongoose.createConnection('mongodb://' + connection_string);
//mongoose.connect('mongodb://' + connection_string);
////var dbConn = mongoose.connection;

//passport config
//var Account = require('./models/account')(mongoose,dbConn);
//var Account = mongoose.model('Account');
//passport.use(new LocalStrategy(Account.authenticate()));
//passport.serializeUser(Account.serializeUser());
//passport.deserializeUser(Account.deserializeUser());

app.get('/', routes.index);

// user
app.get('/register', user.getRegister);
app.get('/login', user.getLogin);
app.get('/logout', user.logout);
app.get('/users', user.users);
app.get('/users/list', user.usersList);

app.post('/register', user.postRegister);
app.post('/login', user.postLogin);

// player
app.get('/players', playerRoute.players);
app.get('/players/list', playerRoute.playersList);
app.get('/newPlayer', playerRoute.newPlayer);
app.get('/findPlayer/:_id', playerRoute.findPlayer);
app.get('/updatePlayer/:_id', playerRoute.newPlayer);

app.post('/newPlayer', playerRoute.postNewPlayer);
app.post('/deletePlayer/:_id', playerRoute.deletePlayer);

// sumula
app.get('/sumulas', sumula.sumulas);
app.get('/sumulas/list', sumula.sumulasList);
app.get('/newSumula', sumula.newSumula);
app.get('/viewSumula/:_id', sumula.newSumula);
app.get('/findSumula/:_id', sumula.findSumula);

app.post('/newSumula', sumula.postNewSumula);
app.post('/deleteSumula/:_id', sumula.deleteSumula);

//reports - player
app.get('/rPlayers', reports.rPlayers);
app.get('/rPlayers/list', reports.rPlayersList);


server.listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});