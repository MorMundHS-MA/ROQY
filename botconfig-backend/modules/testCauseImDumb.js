var MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb://141.19.145.166:27017/mydb';
var bodyParser = require('body-parser');
var express = require('express');
var req = 'botAgents';
var app = express();

app.use(bodyParser.json());

MongoClient.connect(URL, function (err, db) {
    if (err) throw err;

    let itBe = db.collection('botAgents').find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    db.close();
})