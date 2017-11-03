let MongoClient = require('mongodb').MongoClient;
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

let agentCollection = DBConnector.collection('agent');
 */
/**
 * @param {*JSON-Object} data
 * @returns boolean if writing to the Database was sucessfull
 */
cexports.writeToDB = function (data ) {
    
    //
    if(data.botID === undefined) {
        if(data.key === "create"){
            agentCollection.insertOne(data);

        }else if(data.key === "update"){
            let id = data.newValue.id;
            // Look for entry with this id
            if (agentCollection.findOne(data.key === botID)) {
                //Nicht sicher ob hier nur der botID Key gelöscht wird und nicht das ganze JSON-Object
                agentCollection.deleteOne(data.botID, function(err, res) {
                    if (err) throw err;
                }
            );
                //Hier fehlt das Feld von dem JSON in welchem die Änderung drin steht.
                agentCollection.updateOne(data.data.key);
            }
            else {
                agentCollection.insertOne(data);
            }
        }
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

    return;
}

/**
 * @param {*String} id
 * @returns the deleted Bot as an JSON-Object
 */
cexports.deletedFromDB = function(id) {
    return;
}

module.exports = cexports;