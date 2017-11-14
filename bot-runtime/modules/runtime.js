/**
 * Created by manuel.schwalm on 14.11.17.
 */
const refreshTime = 5000;
let runtime = {};
const state = {
    running:"running",
    stopped:"stopped",
    test:"test"
}
const observer = require('./observer');
let bot = {};
runtime.start = function(botId) {
    console.log("Runtime mit der Bot ID " + botId + " wurde gestartet!");
    observer.start(runtime, botId);
    setInterval(runtime.lifeCycle, refreshTime);
};

runtime.update = function(updatedBot){
    bot = updatedBot;
};

runtime.lifeCycle = function(){
    if(bot.status ===  state.running){
        console.log("Bot Läuft!");
    }else {
        console.log("Bot läuft grad nicht!");
    }
};



module.exports = runtime;