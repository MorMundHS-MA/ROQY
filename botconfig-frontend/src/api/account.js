import axios from 'axios'
import local from './local/account'
axios.defaults.baseURL = process.env.API_URL

const api = {
  logIn (account, cb) {
    if (account !== null) {
      axios.post('/auth', {
        'username': account.username,
        'password': account.password
      })
      .then(function (response) {
        cb(account)
      })
    .catch(function (error) {
      console.log(error.message)
    })
    }
  }
}

export default process.env.API_URL === 'local' ? local : api
