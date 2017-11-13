let dbConnector = require("./dbconnector");
let runtime = require("./RunTime.js");

/**
 * @param dbConnector
 */
runObserver = function(dbConnector) {
    
    let lifeCycle = setInterval(function(){
        let newData = [];
        let oldData = [];
        let nextBot;

        newData.push(dbConnector.readFromDB({}));
        
        let i = 0;

        while(newData.length !== 0) {
            //Save first bot in newData to nextBot
            nextBot = newData[0];
            
            //Look for nextBot in oldData
            if(oldData[i] !== nextBot) {
                runtime.addBot(nextBot);
            }
            
            //Remove found Bot in oldData
            else oldData.splice(i,1);
            
            //Remove first entry in newData
            newData.shift();
        }
        
        while(oldData.length !== 0) {
            
            //Save first bot in oldData to nextBot
            nextBot = oldData[0];
            runtime.deleteBot(nextBot);

            //Remove first entry in oldData
            oldData.shift();
        }
        //TODO: Save fetched data to oldData
        return;
    }, 5000)
}