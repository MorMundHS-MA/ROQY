/**
 * Created by manuel.schwalm on 14.11.17.
 */

const dbConnector = require("./dbconnector");
let observer = {};
const refreshTime = 5000;

observer.start = function(runtime, botId) {
    const rtm = runtime;

    setInterval(function(){
        dbConnector.readFromDB({
            botId:botId
        }).then(res => {
            runtime.update(res);
        })
    }, refreshTime);
};

module.exports = observer;