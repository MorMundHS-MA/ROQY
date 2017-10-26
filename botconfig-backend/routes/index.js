var express = require('express');
var requestPromise = require('request-promise');
var router = express.Router();
const LUISClient = require('luis-node-sdk');

var APPID = "4f51b70e-cc17-46b8-8009-801a34e28c90";
const APPKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";

var json_payload = '{"name":"myFirstFAQBot4 ", "Intents":[ { "name":"password_recovery", "questions":[ "what is my password", "I lost my password", "I can not log in", "could you help me with my password?" ] }, { "name":"email_problems", "questions":[ "I lost my mail", "My mail could not be sent", "I can not receive mails" ] }, { "name":"account_security", "questions":[ "I think my account has been hacked", "I can not log into my account", "Could you help me with my account?" ] } ] }';
const messages = {
    "agentNotFound":"The specified agent could not be found: ",
    "agentAlreadyExists":"An agent with that name already exists!",
    "agentDeleted":"The agent has been deleted successfully",
    "agentHasBeenCreated":"The agent has been created successfully",
    "botsFound":"All bots has been returned."
};

const LUISKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";

var responseMessage = {
    "status":"-1",
    "error":"false",
    "message":"",
    "extra":{}
};
var LUISclient;
function responseToClient(res, status, error, message, add){
    responseMessage.status = status;
    responseMessage.error = error;
    responseMessage.message = message;
    if(add !== undefined){
        responseMessage.extra = add;
    }else{
        responseMessage.extra = {};
    }
    res.status(status);

    res.send(JSON.stringify(responseMessage));
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
function existsAgent (id) {
    return new Promise(function (resolve) {
        let options = {
            uri : "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + id,
            method : 'GET',
            headers : {
                "Ocp-Apim-Subscription-Key":LUISKEY
            }
        };
        requestPromise(options).then(res => {
            if (res.statusCode === 400) {
                resolve({
                    "exists":false
                });
            }else {
                resolve({
                    "exists":true,
                    res
                });
            }
        });
    })
};

var printOnSuccess = function (response) {
    console.log(response);
    console.log("Query: " + response.query);
    console.log("Top Intent: " + response.topScoringIntent.intent);
    console.log("Entities:");
    for (var i = 1; i <= response.entities.length; i++) {
        console.log(i + "- " + response.entities[i - 1].entity);
    }
    if (typeof response.dialog !== "undefined" && response.dialog !== null) {
        console.log("Dialog Status: " + response.dialog.status);
        if (!response.dialog.isFinished()) {
            console.log("Dialog Parameter Name: " + response.dialog.parameterName);
            console.log("Dialog Prompt: " + response.dialog.prompt);
        }
    }
};
function delay(t) {
    return new Promise(function (resolve) {
        setTimeout(resolve, t)
    });
}
function killPromise(val) {
    if (val) {
        return {
            "then": function () {
            }
        }
    } else {
        return new Promise(function (resolve) {
            resolve();
        })
    }
}C


router.get("/bot", function(req, clientResponse){
        clientResponse.header("Access-Control-Allow-Origin", "*");
        clientResponse.setHeader("Content-Type", "text/html; charset=utf-8");
        let options = {
            "uri":"https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/",
            "method":"GET",
            "headers":{
                "Ocp-Apim-Subscription-Key": LUISKEY
            }
        };

        requestPromise(options).then(res => {
            responseToClient(clientResponse, 200, false, messages.botsFound, JSON.parse(res));
        }).catch(err => {
            responseToClient(clientResponse, 443, true, err.message);
        });

    });
    C
router.delete("/bot/:id", function (req, clientResponse) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.params.id;
    let options = {
        uri : "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + id,
        method : 'DELETE',
        headers : {
            "Ocp-Apim-Subscription-Key":LUISKEY
        }
    }
    existsAgent(id).then(res => {
        if (!res.exists ) {
            responseToClient(clientResponse, 404, true, messages.agentNotFound);
        }

        else {
            requestPromise(options).then(res => {
                responseToClient(clientResponse, 200, false, messages.agentDeleted);
            }).catch(err => {
                responseToClient(clientResponse, 400, true, err.message);
            })
        }
    }).catch(err => {
        responseToClient(clientResponse, 400, true, err.message);
    })
});

router.get('/bot/:id/query/:query', function (req, clientResponse) {
    res.header("Access-Control-Allow-Origin", "*");    
    const id = req.params.id;
    const query = req.params.query;
    
    existsAgent(id).then(res => {
        if(res.exists){
            LUISclient = LUISClient({
                appId:id,
                appKey:APPKEY,
                verbose:true
            });
            LUISclient.predict(query, {
                onSuccess: function(response){
                    responseToClient(clientResponse, 200, false, response.topScoringIntent.intent);
                }
            })
        } else {
            responseToClient(clientResponse, 404, true, messages.agentNotFound);
        }
    })

});

router.post('/bot', function (req, responseClient) {
    let exampleJson = {
        "name":"",
        "Intents":[
            {
                "name":"",
                "answer":"",
                "questions":[

                ]
            }
        ]
    };


    responseClient.header("Access-Control-Allow-Origin", "*");
    let APPID = "";
    let err = false;
    let options = {};
    let requestBody = req.body;
    existAgent(requestBody.name)
        .then(res => {
            if (res.exists) {
                responseToClient(responseClient, 409, true, messages.agentAlreadyExists);
            }else{
                options = {
                    uri: 'https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/',
                    headers: {
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Key": "ed2ff1a97f924b8e8a1402e6700a8bf4"
                    },
                    method: 'POST',
                    body: {
                        "name": requestBody.name,
                        "description": "",
                        "culture": "en-us",
                        "usageScenario": "IoT",
                        "domain": "Comics",
                        "initialVersionId": "1.0"
                    },
                    json: true // Automatically parses the JSON string in the response
                };
            }

        }).then(() => requestPromise(options))
        .then(res => {
            APPID = res;
            options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + APPID + "/versions/1.0/intents";
            for (let i = 0; i < requestBody.Intents.length; i++) {
                let currentIntent = requestBody.Intents[i];
                options.body = {
                    "name": currentIntent.name
                };
                requestPromise(options);
            }
        }).then(() => {
        options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + APPID + "/versions/1.0/examples";
        delay(1300)
    }).then(() => {
        for (let i = 0; i < requestBody.Intents.length; i++) {
            let ci = requestBody.Intents[i];
            options.body = [];

            for (let j = 0; j < ci.questions.length; j++) {
                options.body.push({
                    "text": ci.questions[j],
                    "intentName": ci.name,
                    "entityLabels": []
                });
            }
            requestPromise(options)
        }
    }).then(() => delay(1300))
        .then(function (response) {

        }).then(function () {
        options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + APPID + "/versions/1.0/train";
        options.body = {};

        requestPromise(options).then(function (response) {
            let published = false;
            let inter = setInterval(function () {
                options.method = "GET";
                requestPromise(options).then(res => {
                    let status = true;
                    for (let i = 0; i < res.length; i++) {
                        status = status && (res[i].details.statusId == 0)
                    }
                    if (status) {
                        clearInterval(inter);
                        options.uri = "https://westus.api.cognitive.microsoft.com/luis/api/v2.0/apps/" + APPID + "/publish";
                        options.body = {
                            "versionId": "1.0",
             
               "isStaging": false,
                            "region": "westus"
                        };
                        options.method = "POST";
                        console.log("Wanna publish");
                        if (!published) {
                            console.log("published");
                            published = true;
                            requestPromise(options).then(function (response) {
                                responseToClient(responseClient, 200, false, messages.agentHasBeenCreated, {
                                    "id":APPID
                                });
                            })
                        }

                    }
                })
            }, 500);
        });
    }).then(function () {
    })
        .catch(function (err) {
            console.log(err);
        });
});

router.get('/names', function (req, res) {
    let names = {
        "Jodie": "Blu",
        "Jara": "Roh"
    };

    res.send(JSON.stringify(names));
});

router.get('')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("");
});

module.exports = router;
