let MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://141.19.145.166:27017/mydb';

cexports = {};

let agentCollection = DBConnector.collection('agent');

/**
 * @param {*JSON-Object} data
 * @returns boolean if writing to the Database was sucessfull
 */

cexports.writeToDB = function (data) {

    MongoClient.connect(url, function (err, db) {
        //To create a new Bot
        if (data.botID === undefined) {
            db.collection("botAgents").insertOne(data, function (err, res) {
                if (err) throw err;
                return true;
            });
        }

        else {
            var newIntend = { $set: { intendID: data.newIntend } };
            db.collection("botAgents").updateOne(data.intendID, newIntend,
                function (err, res) {
                    if (err) {
                        console.log("Your bot does not have such an intent.");
                        return false;
                    }
                    return true;
                });
        }
    });
}