import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

export default {
  getBots (cb) {
    setTimeout(function () {
      axios.get('/bot')
            .then(function (response) {
              cb(response.data)
            })
            .catch(function (error) {
              console.log(error)
            })
    }, 100)
  },
  addNewBot (cb, bot) {
    setTimeout(function () {
      axios.post('/bot', {
        'name': bot.name,
        'description': bot.description,
        'intents': []
      })
      .then(function (response) {
        bot.id = response.data.extra.botId
        cb(bot)
      })
      .catch(function (error) {
        console.log(error)
      })
    }, 100)
  },
  changeBotState (bot, start, stop) {
    setTimeout(function () {
      if (bot.status === 'running') {
        axios.put('/bot/' + bot.id + '/stop', {
          'status': bot.status
        })
        .then(function (response) {
          stop(bot)
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        axios.put('/bot/' + bot.id + '/start', {
          'status': bot.status
        })
                .then(function (response) {
                  start(bot)
                })
                .catch(function (error) {
                  console.log(error)
                })
      }
    }, 100)
  },
  deleteBot (cb, bot) {
    axios.delete('/bot/' + bot.id, {
    })
        .then(function (response) {
          cb(bot)
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  renameBot (cb, bot) {
    setTimeout(function () {
      bot[0].name = bot[1].name
      axios.put('/bot/' + bot[0].id, bot[0])
            .then(function (response) {
              cb(bot)
            })
            .catch(function (error) {
              console.log(error)
            })
    }, 100)
  }

}
