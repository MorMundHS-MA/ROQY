

const runtime = require('./modules/runtime');
let id = process.env.BOT_ID;
console.log(id)
if(id === '0') {
   process.exit(-1);
} else {
setTimeout(() => runtime.start(id), 60000);
}

