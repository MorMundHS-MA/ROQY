let dbConnector = require("./dbconnector");
let runtime = require("./RunTime.js");

/**
 * @param dbConnector
 */
runObserver = function(dbConnector) {
    
    let lifeCycle = setInterval(function(){
        let newData = [dbConnector.readFromDB({})]
        let oldData = [];
        if(newData.length === 0) {
            if(oldData.length === 0) {
                oldData = newData;
                return
            }
            else {
                let nextBot = [];
                for (i = 0; i < oldData.length-1; i++) {
                    nextBot[i] = oldData[i];
                    runtime.deleteBot(nextBot);
                    //TODO: Remove first entry in oldData
                }
                return
            }
        }
        let nextBot = [];

        for(i = 0; i < newData.length-1; i++) {
            nextBot[i] = newData[i];

            if(oldData === nextBot[i]) {
                //TODO: Remove found Bot in oldData
            }
            else {
                runtime.addBot(nextBot);
            }
            //TODO: Remove first entry in newData
        }

    }, 5000)
}