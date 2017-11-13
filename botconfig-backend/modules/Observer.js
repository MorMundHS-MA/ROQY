let dbConnector = require("./dbconnector");
let runtime = require("./RunTime.js");

/**
 * @param dbConnector
 */
runObserver = function(dbConnector) {
    
    let lifeCycle = setInterval(function(){
        let newData = [];
        let oldData = [];

        newData.push(dbConnector.readFromDB({}));
        
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
                    oldData.shift();
                }
                return
            }
        }
        let nextBot = [];

        for(i = 0; i < newData.length-1; i++) {
            nextBot[i] = newData[i];

            if(oldData === nextBot[i]) {
                //Remove found Bot in oldData
                oldData.splice(i, 1);
            }
            else {
                runtime.addBot(nextBot);
            }
            newData.shift();
        }

    }, 5000)
}