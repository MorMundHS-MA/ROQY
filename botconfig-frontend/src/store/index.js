import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

    bots: [
      {
        name: 'Welcome-Bot',
        image: '../assets/bot.png',
        state: 0,
        description: ''
      },
      {
        name: 'FAQ-Bot',
        image: '../assets/bot.png',
        state: 1,
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
    getName (state, payload) {
      return state.bots[payload].name
    },
    getState (state, payload) {
      return state.bots[payload].state
    },
    getTemplates () {
      return this.state.templates
    }
  },
  mutations: {
    changeState (state, payload) {
      if (state.bots[payload] === 1) {
        state.bots[payload] = 0
      } else {
        state.bots[payload] = 1
      }
    },
    addNewbot (state, bot) {
      state.bots.push(bot)
    },
    deleteBot (state, index) {
      state.bots.splice(index, 1)
    }
  },
  actions: {

    changeStateAsync ({ commit }, index) {
      setTimeout(() => {
        commit('changeState', index)
      }, 1000)
    },
    addNewBotAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('addNewBot', payload)
      }, 1000)
    },
    deleteBotAsync ({ commit }, index) {
      setTimeout(function () {
        commit('deleteBot', index)
      }, 1000)
    }

  }
})
