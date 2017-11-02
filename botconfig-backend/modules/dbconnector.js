let MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD
let url = 'mongodb://141.19.145.166:27017/livePersonBots';

exports = module.exports = {};
=======
let url = 'mongodb://141.19.145.166:27017/mydb';
let cexports = {};

/*let DBConnector =
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.createCollection('agent', function(err, res) {
            if(err) throw err;
        });
        return true;
    });

let Observer = [];
>>>>>>> 3ccd53246dcc49f114edb942bcc88d6faff076d0

let agentCollection = DBConnector.collection('agent');
 */
/**
 * @param {*JSON-Object} data
 * @returns boolean if writing to the Database was sucessfull
 */
<<<<<<< HEAD
exports.writeToDB = function (data) {
=======
cexports.writeToDB = function (data ) {
    
    //
    if(data.botID === undefined) {
        if(data.key === "create"){
            agentCollection.insertOne(data);
>>>>>>> 3ccd53246dcc49f114edb942bcc88d6faff076d0

    MongoClient.connect(url, function (err, db) {
        //To create a new Bot
        if (data.botID === undefined) {
            if (data.key === "create") {
                db.collection("botAgents").insertOne(data, function (err, res) {
                    if (err) throw err;
                    return true;
                });
            }
            else {
                console.log('The key value is not set on create.');
                return false;
            }
            // Look for entry with this id
        }
<<<<<<< HEAD
=======
    }else if(data.intentID === undefined) {

    }else {

    }
    

    return;
}

/**
 * @param {*JSON-Object} reference
 * @returns an JSON-Object with the needed Bot-Information
 */
cexports.readFromDB = function(reference) {
>>>>>>> 3ccd53246dcc49f114edb942bcc88d6faff076d0

        else if (data.botID = !undefined) {
            /* The update value only can set on 'name' or 'intent' */
            if (data.update === 'name') {
                var newName = { $set: { name: data.name } };
                db.collection("botAgents").updateOne(data.botID, newName,
                    function (err, res) {
                        if (err) {
                            console.log('A bot with such an botID can not be found.');
                            return false;
                        }
                        return true;
                    });
            }
        }
        else if (data.update === 'newIntend') {
            // TODO: Insert intend into bot
        }

<<<<<<< HEAD
        else if (data.update === 'updateIntend') {
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
=======
/**
 * @param {*String} id
 * @returns the deleted Bot as an JSON-Object
 */
cexports.deletedFromDB = function(id) {
    return;
}

module.exports = cexports;
>>>>>>> 3ccd53246dcc49f114edb942bcc88d6faff076d0
