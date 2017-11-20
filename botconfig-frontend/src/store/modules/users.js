import data from '../../api/account'
import * as types from '../mutation-types'


const state = {
    user = {},
    succesfull: false
}

const getters = {
    getUser: () => state.user,
    checkout: () => state.succesfull
}

const mutations = {
    [types.LOG_IN] (state, account) {
        state.user = account
        state.succesfull = true
    },
    loginError (state) {
        state.succesfull = false
    },
    resetState (state) {
        state.user = {},
        state.succesfull =false
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