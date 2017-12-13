var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var botconfig = require('./routes/botconfig');

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

app.use('/', botconfig);
const fs = require('fs');
console.log(__dirname);
let parseConfigExpected = JSON.parse(fs.readFileSync(__dirname + '/test/pre-built-jsons/parseConfigExpected.json', 'utf8'));
let parseConfigPayload = JSON.parse(fs.readFileSync(__dirname + '/test/pre-built-jsons/parseConfigPayload.json', 'utf8'));
botconfig.parseConfigTointents(parseConfigPayload)
module.exports = app;
