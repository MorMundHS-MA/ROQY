var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

<<<<<<< HEAD
var index = require('./routes/index.js');
=======
var botconfig = require('./routes/botconfig');
>>>>>>> 4edf56d92e302214744894dac5dca75866bc9dbb

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;
