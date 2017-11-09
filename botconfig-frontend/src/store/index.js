import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.157.234:3000'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    bots: [
    ],
    templates: [
      {
        name: 'Welcome-Bot',
        image: '',
        description: ''

      },
      {
        name: 'FAQ-Bot',
        image: '',
        description: ''
      },
      {
        name: 'Ravenclaw-Bot',
        image: '',
        description: ''
      }
    ]
  },
  getters: {
    getbots () {
      return this.state.bots
    },
    getName (state, bot) {
      return state.bots[state.bots.indexOf(bot)].name
    },
    getState (state, bot) {
      return state.bots[state.bots.indexOf(bot)].status
    },
    getTemplates () {
      return this.state.templates
    }
  },
  // synchrone function to change state of app
  mutations: {
    // return status of bot from state
    getBotStatus (state, bot) {
      return this.getState(bot)
    },
    // get all bots from server and save them in state
    getBots (state) {
      axios.get('/bot')
      .then(function (response) {
        for (var i = 0; i < response.length; i++) {
          this.state.push(response[i])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // change status of bot in server and then in state if app
    changeState (state, bot) {
      var b = state.bots.indexOf(bot)
      if (state.bots[b].status === 'online') {
        axios.put('/bot/' + bot.id + '/stop', {
          'status': bot.status
        })
        .then(function (response) {
          state.bots[b].status = 'offline'
          response = state.bots[b].status
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        axios.put('/bot/' + bot.id + '/start', {
          'status': bot.status
        })
        .then(function (response) {
          state.bots[b].status = 'online'
          response = state.bots[b].status
        })
        .catch(function (error) {
          console.log(error)
        })
      }
    },
    // add new bot in DB and then in bots array in state
    addNewbot (state, bot) {
      bot.intents = []
      axios.post('/bot', {
        'name': bot.name,
        'description': bot.description,
        'intents': []
      })
      .then(function (response) {
        bot.id = response.data.extra.botId
        state.bots.push(bot)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // delete bot from server, then from state of app
    deleteBot (state, bot) {
      axios.delete('/bot/' + bot.id, {
      })
      .then(function (response) {
        state.bots.splice(state.bots.indexOf(bot), 1)
        console.log('teste delete')
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    // change name of bot
    renameBot (state, bot) {
      bot[0].name = bot[1].name
      axios.put('/bot/' + bot[0].id, bot[0])
      .then(function (response) {
        state.bots[state.bots.indexOf(bot[0])].name = bot[1].name
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  // asynchrone function to change state of app
  actions: {

    changeStateAsync ({ commit }, index) {
      setTimeout(() => {
        commit('changeState', index)
      }, 1000)
    },
    addNewBotAsync ({ commit }, bot) {
      setTimeout(() => {
        commit('addNewBot', bot)
      }, 1000)
    },
    deleteBotAsync ({ commit }, index) {
      setTimeout(function () {
        commit('deleteBot', index)
      }, 1000)
    }
  }
})
