import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL

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
