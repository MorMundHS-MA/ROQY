/**
 * Created by manuel.schwalm on 20.10.17.
 */
const express = require('express');
const requestPromise = require('request-promise');

const runTime = express();

runTime.addBot = function(bot){
    // TODO do something
    return true;
}

runTime.deleteBot = function(bot){
    // TODO do something
    return true;
}

module.exports = runTime;