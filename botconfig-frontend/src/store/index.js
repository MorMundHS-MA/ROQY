import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {

    bots: [
      {
        name: 'Welcome-Bot',
        image: '',
        state: 'Offline',
        description: ''
      },
      {
        name: 'FAQ-Bot',
        image: '',
        state: 'Online',
        description: ''
      }
    ],
    template: [
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
    getName (state, payload) {
      return this.state.bots[payload].name
    },
    getStatue (state, payload) {
      return this.state.bots[payload].state
    }
  },
  mutations: {
    changeState (state, payload) {
      if (this.state.bots[payload] === false) {
        this.state.bots[payload] = true
      } else {
        this.state.bots[payload] = false
      }
    }
  },
  actions: {

    changeStateAsync ({ commit }, payload) {
      setTimeout(() => {
        commit('changeState', payload)
      }, 1000)
    }

  }
})
