import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.157.234:3000'

export default {
    getTemplates (cb) {
        setTimeout(function() {
            axios.get('/temaple')
            .then(function (response) {
              cb(response)
            })
            .catch(function (error) {
              console.log(error)
            })
        }, 100)
        
    }
}