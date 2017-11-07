let MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://141.19.145.166:27017/mydb';

/**
 * @param {*JSON-Object} request
 * @returns boolean if writing to the Database was sucessfull
 */

exports.writeToDB = function (request) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        //To create a new Bot
        db.createCollection("botAgents", function (err, res) {
            if (err) throw err;
        });

        //To create an complete new bot, if no botID is set
        if (request.botID === undefined) {
            db.collection("botAgents").insertOne(request.data, function (err, res) {
                if (err) {
                    console.log('Bot couldnt get inserted! Dont ask me why.');
                throw err;
                }
                console.log('Bot sucessfull inserted!');
                return true;
            });
        }

        //If something has to get changed on a spezific bot with a bot ID
        else {
            db.collection("botAgents").findOne(request.botID, function (err, res) {
                if (err) {
                    console.log('Bot with such a bot ID couldnt be found!');
                    return false;
                }
                if (request.intendID === undefinded) {
                    //TODO replace found bot with request.data
                    return true;
                }
                else {
                    db.collection("botAgents").findOne(request.botID.intendID, 
                    function (err, res) {
                        if (err) {
                            console.log('A bot with such an Intent ID couldnt be found.');
                            return false;
                        }
                        else {
                            //TODO replace old intent with request.data
                            return true;
                        }
                    });
                }
            });
        }
    });
}