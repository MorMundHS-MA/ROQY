const runtime = require('./modules/runtime');

let id = process.env.BOT_ID || 0;

runtime.start(id);