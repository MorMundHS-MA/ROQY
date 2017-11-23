import data from '../../api/account'
import * as types from '../mutation-types'

const state = {
  user: null
}

const getters = {
  getUser: () => state.user,
  checkout: () => state.successful
}

const mutations = {
  [types.LOG_IN] (state, account) {
    state.user = account
    return state.user
  },
  [types.RESET_STATE] (state) {
    state.user = null
  },
  [types.LOG_IN_ERROR] (state) {
    state.user = null
    return new Error('fehler')
  }
}

const actions = {
  logIn ({commit}, account) {
    data.logIn(
      account,
     () => commit(types.LOG_IN, { account }),
     () => commit(types.LOG_IN_ERROR)
    )
  },
  reset ({commit}) {
    commit(types.RESET_STATE)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
