const assert = require('assert'); //node.js core module
const dbconnector = require('../modules/dbconnector');
const mongoClient = require('mongodb').MongoClient;
const mongoURL = process.env.MONGO_URI;

describe('DBConnector', function () {
    describe('#writeToDB', function () {
        it('should show the inserted bot inside the DB', function (done) {
            mongoClient.connect(mongoURL, function (err, db) {
                if (err) throw err;
                //Inputparameter for data and for the searchrequest
                var requestToDB = { data: { name: 'Fußfetischist' }}

                //Make a create bot Request
                dbconnector.writeToDB(requestToDB).then(res => {
                    //To get the inserted bot right off the database and save it in result
                    db.collection('botAgents').findOne({ name : 'Fußfetischist'}, function (err, result) {
                        if (err) console.log('The inserted Bot can not be found or could not be inserted!')
                        console.log(result)

                        //Check if the bot which got inserted by the connector is in the database
                        assert.equal(result.name, requestToDB.data.name)
                        done();
                    });
                })
            })
        })
    })
})