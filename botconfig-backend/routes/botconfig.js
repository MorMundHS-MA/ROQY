const express = require('express');
const ncmd = require('node-command-line');
const requestPromise = require('request-promise');
const router = express.Router();
const ILuis = require('luis-node-sdk');
const dbcon = require('../modules/dbconnector');

var APPID = "4f51b70e-cc17-46b8-8009-801a34e28c90";
const APPKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";

/**
 * Here are all messages defined, so for changes we don't have redundant data.
 * @type {{botNotFound: string, botAlreadyExists: string, botDeleted: string, botHasBeenCreated: string, botsFound: string, errorWhileCreating: string, botHasBeenStarted: string, botHasBeenStopped: string, generalError: string, botUpdated: string}}
 */
const messages = {
    "botNotFound": "The specified bot could not be found: ",
    "botAlreadyExists": "A bot with that name already exists!",
    "botDeleted": "The bot has been deleted successfully!",
    "botHasBeenCreated": "The bot has been created successfully.",
    "botsFound": "All bots has been returned.",
    "errorWhileCreating": "Error while creating the bot, please try again.",
    "botHasBeenStarted":"The bot has been successfully started!",
    "botHasBeenStopped":"The bot has been successfully stopped!",
    "generalError":"An error occured.",
    "botUpdated":"Bot has been updated successfully!"
};

const LUISKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";
let LUISClient;

/**
 * Sends a response to client
 * @param res - JSON Object - response object for client
 * @param status - Number - status code
 * @param error - Boolean - is an error occured?
 * @param message - String - returned message
 * @param add - Object - extra data for client, this could be everything and should be specified!
 */
function responseToClient(res, status, error, message, add) {
    res.header("Content-Type", "application/json");
    let responseMessage = {
        "status": status,
        "error": error,
        "message": message,
        "extra": add || {}
    };

    res.status(status).send(JSON.stringify(responseMessage));
}
/**
 * Checks wether a bot with this id already exists or not
 * @param id - id of Bot
 * @returns
 *      {
 *          "exists": true when a bot with this name exists,
 *          "agentResponse": Response from Luis with Information about Agent
 *      }
 */
function existsAgent(id) {
    return new Promise(function (resolve) {
        let options = {
            uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + id,
            method: 'GET',
            headers: {
                "Ocp-Apim-Subscription-Key": APPKEY
            },
            json: true
        };
        requestPromise(options).then(res => {
            resolve({
                "exists": true,
                res
            });
        }).catch(res => {
            resolve({
                "exists": false
            });
        });
    })
};


/**
 * Get all Bots
 * This endpoint returns all Bots.
 * Parameters:
 *      none
 * Headers
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.get("/bot", function (req, clientResponse) {
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.setHeader("Content-Type", "text/html; charset=utf-8");
    let bots = dbcon.readFromDB({
    }).then(res => {
        responseToClient(clientResponse, 200, false, messages.botsFound, res);
    });
});

/**
 * Create Bot
 * This endpoint creates a new Bot
 *
 * Parameters:
 *      name - name of the Bot
 *      img - image of the Bot
 *      description - description of the Bot
 *      intents - an Array of intents
 *              id - id of the intent
 *              name - name of the intent
 *              answer - answer when this intent is called
 *              nextIntents - an Array of ID's of the following intents
 *              questions - an Array of Strings, how you could ask for this intent
 *
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.post('/bot', function (req, clientResponse) {
    clientResponse.header("Access-Control-Allow-Origin", "*");
    console.log("Create Bots");
    let appId = "";
    let userData = req.body;
    userData.description = userData.description || "";
    userData.img = userData.img || "../assets/bot.png";
    const initVersion = "1.0";
    let numberOfQuestions = 0;
    let questionsDelivered = 0;
    let options = {
        uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/",
        method: "POST",
        body: {
            "name": userData.name,
            "description": "",
            "culture": "en-us",
            "usageScenario": "IoT",
            "domain": "Comics",
            "initialVersionId": initVersion
        },
        headers: {
            "Ocp-Apim-Subscription-Key": APPKEY
        },
        json: true
    };

    requestPromise(options)
        .then(res => {
            appId = res;
            options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + appId + "/versions/" + initVersion + "/intents";
            for (let i = 0; i < userData.intents.length; i++) {
                let currentIntent = userData.intents[i];
                options.body = {
                    name: userData.intents[i].name
                };
                requestPromise(options);
            }
            return new Promise(ret => {
                ret();
            })
        }).delay(500)
        .then(res => {
            options.method = "GET";
            return new Promise(function (resolve) {
                let waitUntilIntentsCreatedIntervall = setInterval(() => {
                    requestPromise(options)
                        .then(res => {
                            if (res.length >= userData.intents.length) {
                                clearInterval(waitUntilIntentsCreatedIntervall);
                                resolve(res);
                            }
                        })
                }, 500)
            })
        }).delay(500)
        .then(res => {
            console.log("Intents done");
            options.method = "POST";
            options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + appId + "/versions/" + initVersion + "/examples";
            for (let i = 0; i < userData.intents.length; i++) {
                let currentIntent = userData.intents[i];
                options.body = [];
                for (let j = 0; j < userData.intents.length; j++) {
                    options.body.push({
                        "text": currentIntent.questions[j],
                        "intentName": currentIntent.name,
                        "entityLabels": []
                    });
                    numberOfQuestions++;
                }
                requestPromise(options);
            }
            return new Promise(ret => {
                ret();
            })
        }).delay(500)
        .then(res => {
            console.log("Questions done");
            options.method = "GET";
            return new Promise(function (resolve) {
                let waitUntilIntentsCreatedIntervall = setInterval(() => {
                    requestPromise(options)
                        .then(res => {
                            if (res.length >= numberOfQuestions) {
                                clearInterval(waitUntilIntentsCreatedIntervall);
                                options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + appId + "/versions/" + initVersion + "/train";
                                options.method = "POST";
                                resolve(res);
                            }
                        })
                }, 500)
            })
        }).delay(500)
        .then(() => requestPromise(options))
        .then(res => {
            console.log("Start Training");
            options.method = "GET";
            return new Promise(function (resolve) {
                let waitUntilIntentsCreatedIntervall = setInterval(() => {
                    requestPromise(options)
                        .then(res => {
                            let trainingDone = true;
                            for (let i = 0; i < res.length && trainingDone; i++) {
                                if (res[i].details.statusId === 1) {
                                    // TODO maybe retrain?
                                    throw new Error(messages.errorWhileCreating, 409);
                                }
                                if (res[i].details.statusId !== 0) {
                                    trainingDone = false;
                                }
                            }
                            if (trainingDone) {
                                console.log("Training done");
                                clearInterval(waitUntilIntentsCreatedIntervall);
                                options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + appId + "/publish";
                                options.method = "POST";
                                options.body = {
                                    "versionId": "1.0",
                                    "isStaging": false,
                                    "region": "westus"
                                }
                                resolve(res);
                            }
                        })
                }, 500)
            })
        })
        .then(() => requestPromise(options))
        .then(res => {
            userData.id = appId;
            userData.status = "running";
            if(dbcon.writeToDB({
                    "data":userData
                })){
                console.log("Successfully wrote to DB!");
            }else{
                console.log("Error occured while writing into mongodb!");
            }
            res.botId = appId;
            // TODO Start Docker Image with appId from here!
            responseToClient(clientResponse, 201, false, messages.botHasBeenCreated, res);
        })
        .catch(err => {
                console.log(err.statusCode);
                console.log(err.message);
                if (err.statusCode === 400) {
                    responseToClient(clientResponse, 409, true, messages.botAlreadyExists);
                } else if (err.statusCode === 409) {
                    responseToClient(clientResponse, 409, true, messages.errorWhileCreating);
                    options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + appId
                    options.method = "DELETE";
                    requestPromise(options);
                } else {
                    responseToClient(clientResponse, err.statusCode, err.message);
                }
            }
        );


});

/**
 * Delete
 * Deletes the specified Bot.
 *
 * Parameters:
 *      :id - ID of the bot which should be deleted
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.delete("/bot/:id", function (req, clientResponse) {
    // options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + exres.agentResponse.id;
    clientResponse.header("Access-Control-Allow-Origin", "*");
    let id = req.params.id;
    let options = {
        uri: "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + id,
        method: 'DELETE',
        headers: {
            "Ocp-Apim-Subscription-Key": APPKEY
        },
        json: true
    }
    existsAgent(id).then(res => {
        if (!res.exists) {
            responseToClient(clientResponse, 404, true, messages.botNotFound);
        }

        else {
            requestPromise(options).then(res => {
                dbcon.deleteFromDB({
                    botId:id
                })
                responseToClient(clientResponse, 200, false, messages.botDeleted);
            }).catch(err => {
                responseToClient(clientResponse, 400, true, err.message);
            })
        }
    }).catch(err => {
        responseToClient(clientResponse, 400, true, err.message);
    })
});

/**
 * Update
 * Updates the bot with new Data.
 *
 * Parameters:
 *      :id - ID of the bot which sould be updated
 *      data - JSON Object of the Bot.
 *              name - name of the Bot
 *              img - image of the Bot
 *              description - description of the Bot
 *              intents - an Array of intents
 *                      id - id of the intent
 *                      name - name of the intent
 *                      answer - answer when this intent is called
 *                      nextIntents - an Array of ID's of the following intents
 *                      questions - an Array of Strings, how you could ask for this intent
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.put('/bot/:id', function(req, clientResponse){
    let id = req.params.id;
    let write = dbcon.writeToDB({
        botId:id,
        data:req.body
    });

    responseToClient(clientResponse, 200, false, messages.botUpdated);

});

/**
 * Status
 * When you make a get Request on this endpoint, the bot status is returned. "stopped" for a stopped bot, "running" for
 * a running Bot, "test" for a test state and "problem" when a unknown problem occured.
 *
 * Parameters:
 *      :id - ID of the bot
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.get('/bot/:id/status', function(req, clientResponse){
     let id = req.params.id;
     dbcon.readFromDB({
         "botId":id
     }).then(bot => {
         responseToClient(clientResponse, 200, false, messages.botsFound, {"status":bot.status});
     });
});

/**
 * Start bot
 * When you make a put Request on this Endpoint, the bot which is specified by :id get started
 *
 * Parameters:
 *      :id - ID of the bot
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.put('/bot/:id/start', function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Origin", "*");

    let id = req.params.id;
    dbcon.readFromDB({
        botId:id
    }).then(res => {
        if(res !== {}){
            res.status = "running";
            let write = dbcon.writeToDB({
                botId:id,
                data:res
            });

            responseToClient(clientResponse, 200, false, messages.botHasBeenStarted);

        }

    });
});

/**
 * Stop bot
 * When you make a put Request on this Endpoint, the bot which is specified by :id is stopped.
 *
 * Parameters:
 *      :id - ID of the bot
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.put('/bot/:id/stop', function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Origin", "*");

    let id = req.params.id;
    dbcon.readFromDB({
        botId:id
    }).then(res => {
        if(res !== {}){
            res.status = "stopped";
            let write = dbcon.writeToDB({
                botId:id,
                data:res
            });

            responseToClient(clientResponse, 200, false, messages.botHasBeenStopped);

        }

    });

});


/**
 * Query
 * Starts a query to LUIS and responses an answer
 *
 * Parameters:
 *      :id - ID of the bot
 *      :query - Query for LUIS
 * Headers:
 *      Authorization - Account ID from LiveEngage to identify the bots this customer owns.
 */
router.get('/bot/:id/query/:query', function (req, clientResponse) {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    const query = req.params.query;

    existsAgent(id).then(res => {
        if(res.exists){
            LUISClient = LUISClient({
                appId:id,
                appKey:APPKEY,
                verbose:true
            });
            LUISClient.predict(query, {
                onSuccess: function(response){
                    dbcon.readFromDB({
                        botId: id
                    }).then(bot => {
                        for(let i = 0; i<bot.intents.length; i++){
                            if(bot.intents[i].name === response.topScoringIntent.intent){
                                responseToClient(clientResponse, 200, false, bot.intents[i].answer);
                            }
                        }
                    })
                }
            })
        } else {
            responseToClient(clientResponse, 404, true, messages.botNotFound);
        }
    })

});



// options. They set some Headers for CORS

router.options("/bot", function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    clientResponse.header("Acces-Control-Max-Age", 86400);
    clientResponse.end();
});
router.options("/bot/:id", function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Methods", "DELETE, PUT, OPTIONS");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    clientResponse.header("Acces-Control-Max-Age", 86400);
    clientResponse.end();
});
router.options("/bot/:id/status", function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    clientResponse.header("Acces-Control-Max-Age", 86400);
    clientResponse.end();
});
router.options("/bot/:id/start", function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Methods", "PUT, OPTIONS");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    clientResponse.header("Acces-Control-Max-Age", 86400);
    clientResponse.end();
});
router.options("/bot/:id/stop", function(req, clientResponse){
    clientResponse.header("Access-Control-Allow-Methods", "PUT, OPTIONS");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    clientResponse.header("Acces-Control-Max-Age", 86400);
    clientResponse.end();
});

module.exports = router;
