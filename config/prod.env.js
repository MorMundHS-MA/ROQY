'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_URL: process.env.API_URL !== undefined ? '"' + process.env.API_URL + '"' : '"http://141.19.142.7:3000"'
}
