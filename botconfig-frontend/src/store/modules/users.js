import data from '../../api/account'
import * as types from '../mutation-types'

const state = {
  user: {},
  successful: false
}

const getters = {
  getUser: () => state.user,
  checkout: () => state.successful
}

const mutations = {
  [types.LOG_IN] (state, account) {
    state.user = account
    state.successful = true
  },
  loginError (state) {
    state.successful = false
  },
  resetState (state) {
    state.user = {}
    state.successful = false
  }
}

const actions = {
  logIn ({commit}, accont) {
    data.logIn(
      accont,
      commit(types.LOG_IN, { accont }),
      commit('loginError')
    )
  },
  reset ({commit}) {
    commit('resetState')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
