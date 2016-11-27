
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
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
app.get('/register', routes.getRegister);
app.get('/login', routes.getLogin);
app.get('/logout', routes.logout);
app.get('/users', routes.users);
app.get('/users/list', routes.usersList);

app.post('/register', routes.postRegister);
app.post('/login', routes.postLogin);

app.get('/players', routes.players);
app.get('/players/list', routes.playersList);
app.get('/newPlayer', routes.newPlayer);

app.post('/newPlayer', routes.postNewPlayer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
