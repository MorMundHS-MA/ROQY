import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

export default {
  getTemplates (cb) {
    setTimeout(function () {
      axios.get('/template')
      .then(function (response) {
        cb(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    }, 100)
  },
  addNewTemplate (cb, template) {
    setTimeout(function () {
      axios.get('/template')
        .then(function (response) {
          cb(template)
        })
        .catch(function (error) {
          console.log(error)
        })
    }, 100)
  }
}
