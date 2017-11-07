const express = require('express');
const requestPromise = require('request-promise');
const router = express.Router();
const ILuis = require('luis-node-sdk');
const dbcon = require('../modules/dbconnector');

var APPID = "4f51b70e-cc17-46b8-8009-801a34e28c90";
const APPKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";

const messages = {
    "botNotFound": "The specified bot could not be found: ",
    "botAlreadyExists": "A bot with that name already exists!",
    "botDeleted": "The bot has been deleted successfully!",
    "botHasBeenCreated": "The bot has been created successfully.",
    "botsFound": "All bots has been returned.",
    "errorWhileCreating": "Error while creating the bot, please try again.",
    "botHasBeenStarted":"The bot has been successfully started!",
    "botHasBeenStopped":"The bot has been successfully stopped!",
    "generalError":"An error occured."
};

const LUISKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";
let LUISClient;
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
 *
 * @param id Name of Bot
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

function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    });
}


router.get("/bot", function (req, clientResponse) {
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.setHeader("Content-Type", "text/html; charset=utf-8");
    let bots = dbcon.readFromDB({
        "key":"allBots"
    });
    responseToClient(clientResponse, 200, false, messages.botsFound, bots);
});



router.post('/bot', function (req, clientResponse) {
    let exampleJson = {
        "name": "",
        "Intents": [
            {
                "name": "",
                "answer": "",
                "questions": []
            }
        ]
    };
    let appId = "";
    let userData = req.body;
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
                setTimeout(() => {
                    requestPromise(options);
                }, 20);
            }
            return new Promise(ret => {
                ret();
            })
        })
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
        })
        .then(res => {
            options.method = "POST";
            console.log("Post Quests");
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
                setTimeout(() => {
                    requestPromise(options);
                }, 20);
            }
            return new Promise(ret => {
                ret();
            })
        })
        .then(res => {
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
        })
        .then(() => requestPromise(options))
        .then(res => {
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
            responseToClient(clientResponse, 201, false, messages.botHasBeenCreated, res);
        })
        .catch(err => {
                console.log("in errr");
                console.log(err);
                console.log("end Errs");
                responseToClient(clientResponse, 409, true, messages.botAlreadyExists);                
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

router.options("/bot/", function(req, clientResponse){
    console.log("create test");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    clientResponse.header("Access-Control-Max-Age", 86400);
    clientResponse.statusCode = 200;
    clientResponse.end();
})

router.options("/bot/:id/stop", function(req, clientResponse){
    console.log("stop");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    clientResponse.header("Access-Control-Max-Age", 86400);
    clientResponse.statusCode = 200;
    clientResponse.end();
})

router.options("/bot/:id/start", function(req, clientResponse){
    console.log("start");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    clientResponse.header("Access-Control-Max-Age", 86400);
    clientResponse.statusCode = 200;
    clientResponse.end();
})

router.options("/bot/:id", function(req, clientResponse){
    console.log("delete");
    clientResponse.header("Access-Control-Allow-Origin", "*");
    clientResponse.header("Access-Control-Allow-Methods", "DELETE, OPTIONS");
    clientResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    clientResponse.header("Access-Control-Max-Age", 86400);
    clientResponse.statusCode = 200;
    clientResponse.end();
})

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
                responseToClient(clientResponse, 200, false, messages.botDeleted);
            }).catch(err => {
                responseToClient(clientResponse, 400, true, err.message);
            })
        }
    }).catch(err => {
        responseToClient(clientResponse, 400, true, err.message);
    })
});
/*
Update Bot
 */
router.put('/bot/:id', function(req, clientResponse){

});

/*
get bot status
 */
router.get('/bot/:id/status', function(req, clientResponse){
    let id = req.params.id;
    dbcon.readFromDB({
        "key":"",
        "botID":""
    });
});

/*
start bot
 */
router.put('/bot/:id/start', function(req, clientResponse){
    let id = req.params.id;
    let params = {
        "key":"state",
        "newValue":"running",
        "botID":id
    };
    if(dbcon.writeToDB(params)){
        responseToClient(clientResponse, 200, false, messages.botHasBeenStarted);
    }else{
        responseToClient(clientResponse, 404, true, messages.generalError);
    }
});

/*
stop bot
 */
router.put('/bot/:id/stop', function(req, clientResponse){
    let id = req.params.id;
    let params = {
        "key":"state",
        "newValue":"stopped",
        "botID":id
    };
    console.log("here");
    if(dbcon.writeToDB(params)){
        console.log("Wu");
        responseToClient(clientResponse, 200, false, messages.botHasBeenStopped);
    }else{
        console.log("hu");
        responseToClient(clientResponse, 404, true, messages.generalError);
    }
});



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
                    responseToClient(clientResponse, 200, false, response.topScoringIntent.intent);
                }
            })
        } else {
            responseToClient(clientResponse, 404, true, messages.botNotFound);
        }
    })

});

module.exports = router;
