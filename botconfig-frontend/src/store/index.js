import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

    bots: [
      {
        name: 'Welcome-Bot',
        image: '../assets/bot.png',
        status: 'offline',
        description: ''
      },
      {
        name: 'FAQ-Bot',
        image: '../assets/bot.png',
        status: 'online',
        description: ''
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
    getName (state, index) {
      return state.bots[index].name
    },
    getState (state, index) {
      return state.bots[index].status
    },
    getTemplates () {
      return this.state.templates
    }
  },
  mutations: {
    changeState (state, bot) {
      var b = state.bots.indexOf(bot)
      if (state.bots[b].status === 'online') {
        state.bots[b].status = 'offline'
      } else {
        state.bots[b].status = 'online'
      }
    },
    addNewbot (state, bot) {
      state.bots.push(bot)
    },
    deleteBot (state, bot) {
      state.bots.splice(state.bots.indexOf(bot), 1)
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
