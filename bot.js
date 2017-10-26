const bot={
    id: '',
    currentState:'',
    name: ''
}

/**
 * @returns an boolean with true if bot got started sucessfully
 */
function start() {
    return bot.currentState='online';
}

/**
 * @returns an boolean with true if bot got stopped sucessfully
 */
function stopp() {
    return bot.currentState='offline';
}

function getState(){
    return bot.currentState;
}