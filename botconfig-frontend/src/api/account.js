import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL

export default {
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
