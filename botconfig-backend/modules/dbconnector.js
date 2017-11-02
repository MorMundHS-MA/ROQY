let MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://141.19.145.166:27017/mydb';

cexports = {};

let agentCollection = DBConnector.collection('agent');
 
/**
 * @param {*JSON-Object} data
 * @returns boolean if writing to the Database was sucessfull
 */

cexports.writeToDB = function (data ) {
    
    //
    if(data.botID === undefined) {
        if(data.key === "create"){
            agentCollection.insertOne(data);
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
        else if (data.botID !== undefined) {
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
  
/**
 * @param {*String} id
 * @returns the deleted Bot as an JSON-Object
 */
cexports.deletedFromDB = function(id) {
    return;
}

module.exports = cexports;
