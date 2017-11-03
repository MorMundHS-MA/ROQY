import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://141.19.142.7:3000'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    bots: [
      {
        id: 0,
        name: 'Welcome-Bot',
        image: '../assets/bot.png',
        status: 'offline',
        description: '',
        intents: [
          {
            id: 0,
            name: '',
            answer: '',
            nextintents: [],
            questions: []
          }
        ]
      }
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
  mutations: {
    getBotStatus (state, bot) {
      return this.getState(bot)
    },
    getBots (state) {
      axios.get('/bot')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    changeState (state, bot) {
      var b = state.bots.indexOf(bot)
      if (state.bots[b].status === 'online') {
        axios.post('/bot/' + bot.id + '/stop', {
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
        axios.post('/bot/' + bot.id + '/start', {
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
    addNewbot (state, bot) {
      axios.post('/bot', {
        'name': bot.name,
        'description': bot.description,
        'intents': []
      })
      .then(function (response) {
        state.bots.push(bot)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    deleteBot (state, bot) {
      axios.delete('/bot/' + bot.id, {
      })
      .then(function (response) {
        state.bots.splice(state.bots.indexOf(bot), 1)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    renameBot (state, bot) {
      state.bots[state.bots.indexOf(bot[0])].name = bot[1].name
    }
  },
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
