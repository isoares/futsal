
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , player = require('./routes/player')
  , sumula = require('./routes/sumula')
  , reports = require('./routes/reports')
  , http = require('http')
  , path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.locals.appTitle = "Futsal";

// all environments
app.set('port', process.env.PORT || 3000);
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

//passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/sumula');

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
app.get('/players', player.players);
app.get('/players/list', player.playersList);
app.get('/newPlayer', player.newPlayer);
app.get('/findPlayer/:_id', player.findPlayer);
app.get('/updatePlayer/:_id', player.newPlayer);


app.post('/newPlayer', player.postNewPlayer);

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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
