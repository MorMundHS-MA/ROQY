let MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://141.19.145.166:27017/mydb';

/**
 * This method is for write a new bot or changing intents inside
 * the Mongo Database
 * @param {*JSON-Object} request
 * @returns boolean if writing to the Database was sucessfull
 */
exports.writeToDB = function (request) {

    let retval = {
        "message":"",
        "success":true
    }

    return MongoClient.connect(url, function (err, db) {
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
                    //TODO delete whole bot and insert new
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

/**
 * This method is for getting a whole bot or reading intents out of the
 * Mongo Database
 */
exports.readFromDB = function (request) {

    return new Promise(function(resolve){
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;

            if(request.botID === undefined) {
                return db.collection("botAgents").find({}).toArray(function(err, res) {
                    resolve(res);
                });

            }

            //If the bot ID is set and intents from a bot are wanted
            else {
                db.collection("botAgents").findOne(request.botID, function (err, res) {
                    if (err) {
                        console.log('A bot with such an ID can not be found!');
                        //returns an empty JSON-Object
                        resolve({});
                    }

                    else {
                        //If only one bot is wanted
                        if(request.intendID === undefined) {
                            resolve(db.collection("botAgents").findOne(request.botID));
                        }

                        else {
                            db.collection("botAgents").findOne(request.botID.intendID,
                                function (err, res) {
                                    if (err) {
                                        //returns an empty JSON-Object
                                        resolve({});
                                    }
                                    else {
                                        resolve(db.collection("botAgents").findOne(request.botID.intendID));
                                    }
                                });
                        }
                    }
                });
            }
        });
    });
}



exports.readMultipleFromDB = function(request){
    let retval = [];
    for(let i = 0; i<request.length; i++){
        let response = exports.readFromDB(request[i]);
        retval.push(response);
    }
    return retval;
}