/**
 * Created by manuel.schwalm on 14.11.17.
 */

const Agent = require('node-agent-sdk').Agent;
const config = require('dotenv').config;
const FAQBot = require('./GeneralBot');
const APPKEY = "ed2ff1a97f924b8e8a1402e6700a8bf4";
const LUISClient = require('luis-node-sdk');

let agent;
config();
const observer = require('./observer');
const refreshTime = 5000;
const state = {
    running: "running",
    stopped: "stopped",
    test: "test"
};



let runtime = {};
let bot = {};
/*let bot = {
    "name":"botTester1ForLUIS",
    "description":"I am a bot Test",
    "intents": [

        {
            "id": 0,
            "name":"weather",
            "answer": "Okay! I tell you something about weather!",
            "nextIntents": [
                1
            ],
            "questions": [
                "Tell me something about weather!"
            ]
        },
        {
            "id": 1,
            "name":"weather_for",
            "answer": "Very good!!",
            "nextIntents": [0, 2],
            "questions": [
                "How will be weather?"
            ]
        },
        {
            "id": 2,
            "name":"sky",
            "answer": "Sure, when do you want to get program?",
            "nextIntents": [3, 4],
            "questions": [
                "Could you tell me what will be on sky?"
            ]
        },
        {
            "id": 3,
            "name":"matrix",
            "answer": "At 20:15 you can see Matrix! Do you want to get more program?",
            "nextIntents": [5, 6],
            "questions": [
                "20:15",
                "At 20:15"
            ]
        },
        {
            "id": 4,
            "name":"matrix_reloaded",
            "answer": "At 22:15 you can see Matrix: Reloaded! Do you want to get more program?",
            "nextIntents": [5, 6],
            "questions": [
                "22:15",
                "At 22:15"
            ]
        },
        {
            "id": 5,
            "name":"sky_yes",
            "answer": "Okay, when do you want to get the next program?",
            "nextIntents": [3, 4],
            "questions": [
                "Yes",
                "Sure",
                "definetly"
            ]
        },
        {
            "id": 6,
            "name":"sky_no",
            "answer": "Okay, how may I help you?",
            "nextIntents": [0, 2],
            "questions": [
                "No",
                "Never"
            ]
        }
    ],
    "intentState": {
        "id": -1,
        "nextIntents": [
            0
        ]
    },
    "botType":"welcome",
    "privacy":"private",
    "img":"../assets/bot.png",
    "status": "running"
};
*/

runtime.delConversation = function(convId){
    delete bot.conversations[convId];
    console.log(bot.conversations);
}

runtime.addConversation = function(convId){
    if(bot.conversations === undefined)
        bot.conversations = {};
    if(bot.conversations[convId] === undefined)
    bot.conversations[convId] = {
        convId:convId,
        intentState: bot.originIntentState,
        recentlyStarted: true,
        config: bot.intents
    };
    console.log(bot.conversations);
};

runtime.start = function (botId) {
    runtime.LUISClient = LUISClient({
        appId:botId,
        appKey:APPKEY,
        verbose:true
    });
    observer.start(runtime, botId);
    log("Runtime mit der Bot ID " + botId + " wurde gestartet!");
    agent = new FAQBot({
        accountId:process.env.LP_ACCOUNT,
        username: process.env.LP_USER,
        password: process.env.LP_PASS
    }, runtime);
    agent.on('GeneralBot.ContentEvnet',(contentEvent)=>{
        let conv = bot.conversations[contentEvent.dialogId];
        if(conv === undefined){
            runtime.addConversation(contentEvent.dialogId);
            conv = bot.conversations[contentEvent.dialogId];
        }
        if(conv.recentlyStarted){
            conv.recentlyStarted = false;
            return;
        }
        let response = "Sorry, I could not understand you :(.";
        queryResponse(contentEvent.message, conv).then(nextIntent => {
            if(nextIntent !== undefined){
                conv.intentState = nextIntent;
                response = nextIntent.answer;
            }
            agent.publishEvent({
                dialogId:contentEvent.dialogId,
                event: {
                    type:'ContentEvent',
                    contentType:'text/plain',
                    message: response
                }
            })
        });

    });
};

function queryResponse(message, conv){

    return new Promise(function(resolve){
        runtime.LUISClient.predict(message, {
            onSuccess: function(response){
                let avialableIntents = [];

                for(let i = 0; i<conv.intentState.nextIntents.length; i++){
                    for(let j = 0; j<conv.config.intents.length; j++){
                        if(conv.config.intents[j].id === conv.intentState.nextIntents[i]){
                            avialableIntents.push(conv.config.intents[j]);
                        }
                    }
                }

                let topIntent = {
                    score:0
                };
                for(let i = 0; i<avialableIntents.length; i++){
                    for(let j = 0; j<response.intents.length; j++){
                        if(avialableIntents[i].name === response.intents[j].intent && response.intents[j].score > topIntent.score && response.intents[j].score >= 0.1){
                            topIntent = avialableIntents[i];
                            topIntent.score = response.intents[j].score;
                        }
                    }
                }
                if(response.topScoringIntent === 'None'){
                    resolve(undefined);
                }else{
                    delete topIntent.score;
                    resolve(topIntent);
                }
            },
            onFailure: function(response)
            {
                console.log(response);
            }
        })

    });
}

runtime.update = function (updatedBot) {
    if(bot.conversations !== undefined)
    updatedBot.conversations = bot.conversations;
    bot = updatedBot;
    observer.saveBot(bot);
};

function log(out, err, resp){
    err = err || "";
    resp = resp || "";
    console.log("[" + bot.name + "] " + out, err, resp);
}

module.exports = runtime;