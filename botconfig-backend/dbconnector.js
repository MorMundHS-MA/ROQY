let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://141.19.145.166:27017/mydb';
let exports = {};

let DBConnector = {
    ip: '',
    username: '',
    password: '',
}
let Observer = [];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection('agent', function(err, res) {
        if(err) throw err;
        db.close();
    });
});

/**
 * @param {*JSON-Object} data
 * @returns boolean if writing to the Database was sucessfull
 */
exports.writeToDB = function (data) {
    
    return;
}

/**
 * @param {*JSON-Object} reference
 * @returns an JSON-Object with the needed Bot-Information
 */
function readFromDB(reference) {
    return;
}

/**
 * @param {*String} id
 * @returns the deleted Bot as an JSON-Object
 */
function deletedFromDB(id) {
    return;
}