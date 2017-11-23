/**
 * Created by manuel.schwalm on 14.11.17.
 */

const dbConnector = require("./dbconnector");
let observer = {};
const refreshTime = 5000;

observer.start = function(runtime, botId) {
    function toUpdate(){
        console.log("Update");
        dbConnector.readFromDB({
            botId:botId
        }).then(res => {
            runtime.update(res);
        })
    }
    const rtm = runtime;
    if(botId === 0)return;
    toUpdate();
    setInterval(toUpdate, refreshTime);
};

observer.saveBot = function(bot){
    delete bot._id;
    if(bot.id === undefined){

    }else{
        return dbConnector.writeToDB({
            botId:bot.id,
            data:bot
        }).then(success => {
            console.log("Bot saved " + success);
        });
    }
};

module.exports = observer;