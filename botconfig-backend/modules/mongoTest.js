var http = require('http');
var express = require('express');
var mongoTest = require('./dbconnector');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//var req = {  data : {name : 'Pikachu'}};

app.post('/bot', function (req, res) {
    mongoTest.writeToDB(req.body);
    res.end();
});

app.get('/bot', function (req, res) {
    mongoTest.readFromDB(req.body).then(dbres => {
        console.log( dbres );
        res.send( dbres );
    })
});

app.delete('/bot/', function (req, res) {
    let botId = { botId : "fe2440b7-29af-4457-9edc-ac1928aae03f" };
    res.send(mongoTest.deleteFromDB(botId));
    res.end();
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});