import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

export default {
  logIn (account, cb) {
    console.log(account)
    setTimeout(() => {
      axios.get('/auth', {
        'username': account.username,
        'password': account.password
      },
        {
          headers: {
            Authorization: 'ed2ff1a97f924b8e8a1402e6700a8bf4'
          }
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
