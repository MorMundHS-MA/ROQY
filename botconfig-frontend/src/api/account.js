import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

export default {
  logIn (account, cb) {
    console.log(account)
    if (account !== null) {
      setTimeout(() => {
        axios.get('/auth', {
          'username': account.username,
          'password': account.password
        })
        .then(function (response) {
          cb(account, response.data.extra.Authorization)
        })
      .catch(function (error) {
        console.log(error.message)
      })
      }, 100)
    }
  }
}
