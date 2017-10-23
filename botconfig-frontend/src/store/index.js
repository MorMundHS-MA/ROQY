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
    getStatue (state, payload) {
      return state.bots[payload].state
    },
    getTemplates () {
      return this.state.templates
    }
  },
  mutations: {
    changeState (state, payload) {
      if (state.bots[payload] === false) {
        state.bots[payload] = true
      } else {
        state.bots[payload] = false
      }
    },
    addNewbot (state, bot) {
      state.bots.push(bot)
    },
    deleteBot (state, payload) {
      state.bots.slice(payload, 1)
    }
  },
  actions: {

    changeStateAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('changeState', payload)
      }, 1000)
    },
    addNewBotAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('addNewBot', payload)
      }, 1000)
    },
    deleteBotAsync ({ commit }, payload) {
      setTimeout(function () {
        commit('deleteBot', payload)
      }, 1000)
    }

  }
})
