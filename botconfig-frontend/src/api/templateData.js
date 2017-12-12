import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

export default {
  getTemplates (cb) {
    axios.get('/template')
    .then(function (response) {
      cb(response.data.extra)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  addNewTemplate (cb, template) {
    axios.get('/template')
      .then(function (response) {
        cb(template)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
